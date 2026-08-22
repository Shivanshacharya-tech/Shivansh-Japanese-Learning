import sqlite3
import hashlib
import hmac
import secrets
from pathlib import Path
from typing import Any
from datetime import datetime, timezone

DATABASE_PATH = Path(__file__).resolve().parent.parent / "data" / "progress.db"


def get_connection() -> sqlite3.Connection:
    DATABASE_PATH.parent.mkdir(parents=True, exist_ok=True)
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    with get_connection() as connection:
        connection.executescript(
            """
            CREATE TABLE IF NOT EXISTS completed_lessons (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                content_type TEXT NOT NULL,
                content_id TEXT NOT NULL,
                level TEXT,
                completed_at TEXT NOT NULL,
                UNIQUE(user_id, content_type, content_id, level)
            );

            CREATE TABLE IF NOT EXISTS quiz_results (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER,
                quiz_type TEXT NOT NULL,
                level TEXT,
                score INTEGER NOT NULL,
                total INTEGER NOT NULL,
                percentage REAL NOT NULL,
                completed_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password_hash TEXT NOT NULL,
                created_at TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sessions (
                token TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TEXT NOT NULL,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );

            CREATE TABLE IF NOT EXISTS incorrect_answers (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                quiz_type TEXT NOT NULL,
                level TEXT,
                prompt TEXT NOT NULL,
                correct_answer TEXT NOT NULL,
                user_answer TEXT NOT NULL,
                explanation TEXT,
                reviewed INTEGER NOT NULL DEFAULT 0,
                created_at TEXT NOT NULL,
                reviewed_at TEXT,
                FOREIGN KEY(user_id) REFERENCES users(id)
            );
            """
        )
        lesson_columns = {row[1] for row in connection.execute("PRAGMA table_info(completed_lessons)")}
        quiz_columns = {row[1] for row in connection.execute("PRAGMA table_info(quiz_results)")}
        if "user_id" not in lesson_columns:
            connection.execute("ALTER TABLE completed_lessons ADD COLUMN user_id INTEGER")
        if "user_id" not in quiz_columns:
            connection.execute("ALTER TABLE quiz_results ADD COLUMN user_id INTEGER")


def _hash_password(password: str, salt: bytes | None = None) -> str:
    salt = salt or secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt, 120_000)
    return f"{salt.hex()}${digest.hex()}"


def _verify_password(password: str, stored_hash: str) -> bool:
    salt_hex, digest_hex = stored_hash.split("$", 1)
    candidate = _hash_password(password, bytes.fromhex(salt_hex)).split("$", 1)[1]
    return hmac.compare_digest(candidate, digest_hex)


def create_user(username: str, password: str) -> dict[str, Any]:
    created_at = datetime.now(timezone.utc).isoformat()
    with get_connection() as connection:
        try:
            cursor = connection.execute(
                "INSERT INTO users (username, password_hash, created_at) VALUES (?, ?, ?)",
                (username, _hash_password(password), created_at),
            )
        except sqlite3.IntegrityError as error:
            raise ValueError("Username is already registered") from error
    return {"id": cursor.lastrowid, "username": username, "created_at": created_at}


def authenticate_user(username: str, password: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT id, username, password_hash, created_at FROM users WHERE username = ?",
            (username,),
        ).fetchone()
    if row is None or not _verify_password(password, row["password_hash"]):
        return None
    return {"id": row["id"], "username": row["username"], "created_at": row["created_at"]}


def create_session(user_id: int) -> str:
    token = secrets.token_urlsafe(32)
    with get_connection() as connection:
        connection.execute(
            "INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)",
            (token, user_id, datetime.now(timezone.utc).isoformat()),
        )
    return token


def get_user_by_token(token: str) -> dict[str, Any] | None:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT users.id, users.username, users.created_at FROM sessions "
            "JOIN users ON users.id = sessions.user_id WHERE sessions.token = ?",
            (token,),
        ).fetchone()
    return dict(row) if row else None


def delete_session(token: str) -> None:
    with get_connection() as connection:
        connection.execute("DELETE FROM sessions WHERE token = ?", (token,))


def fetch_progress(user_id: int) -> dict[str, list[dict[str, Any]]]:
    with get_connection() as connection:
        lessons = connection.execute(
            "SELECT content_type, content_id, level, completed_at "
            "FROM completed_lessons WHERE user_id = ? ORDER BY id", (user_id,)
        ).fetchall()
        quizzes = connection.execute(
            "SELECT quiz_type, level, score, total, percentage, completed_at "
            "FROM quiz_results WHERE user_id = ? ORDER BY id", (user_id,)
        ).fetchall()
    return {
        "completed_lessons": [dict(lesson) for lesson in lessons],
        "quiz_results": [dict(quiz) for quiz in quizzes],
    }


def save_lesson(record: dict[str, Any], user_id: int) -> None:
    with get_connection() as connection:
        connection.execute(
            "INSERT OR IGNORE INTO completed_lessons "
            "(user_id, content_type, content_id, level, completed_at) VALUES (?, ?, ?, ?, ?)",
            (user_id, record["content_type"], record["content_id"], record["level"], record["completed_at"]),
        )


def save_quiz(record: dict[str, Any], user_id: int) -> None:
    with get_connection() as connection:
        connection.execute(
            "INSERT INTO quiz_results "
            "(user_id, quiz_type, level, score, total, percentage, completed_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?)",
            (
                user_id,
                record["quiz_type"],
                record["level"],
                record["score"],
                record["total"],
                record["percentage"],
                record["completed_at"],
            ),
        )


def clear_progress(user_id: int) -> None:
    with get_connection() as connection:
        connection.execute("DELETE FROM completed_lessons WHERE user_id = ?", (user_id,))
        connection.execute("DELETE FROM quiz_results WHERE user_id = ?", (user_id,))
        connection.execute("DELETE FROM incorrect_answers WHERE user_id = ?", (user_id,))


def save_incorrect_answer(record: dict[str, Any], user_id: int) -> None:
    with get_connection() as connection:
        connection.execute(
            "INSERT INTO incorrect_answers "
            "(user_id, quiz_type, level, prompt, correct_answer, user_answer, explanation, created_at) "
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            (
                user_id,
                record["quiz_type"],
                record["level"],
                record["prompt"],
                record["correct_answer"],
                record["user_answer"],
                record["explanation"],
                record["created_at"],
            ),
        )


def fetch_incorrect_answers(user_id: int) -> list[dict[str, Any]]:
    with get_connection() as connection:
        rows = connection.execute(
            "SELECT id, quiz_type, level, prompt, correct_answer, user_answer, explanation, created_at "
            "FROM incorrect_answers WHERE user_id = ? AND reviewed = 0 ORDER BY id DESC",
            (user_id,),
        ).fetchall()
    return [dict(row) for row in rows]


def mark_answer_reviewed(answer_id: int, user_id: int) -> bool:
    with get_connection() as connection:
        cursor = connection.execute(
            "UPDATE incorrect_answers SET reviewed = 1, reviewed_at = ? "
            "WHERE id = ? AND user_id = ?",
            (datetime.now(timezone.utc).isoformat(), answer_id, user_id),
        )
    return cursor.rowcount > 0


def fetch_analytics(user_id: int) -> dict[str, Any]:
    with get_connection() as connection:
        summary = connection.execute(
            "SELECT COUNT(*) AS quizzes, COALESCE(AVG(percentage), 0) AS average "
            "FROM quiz_results WHERE user_id = ?", (user_id,)
        ).fetchone()
        by_type = connection.execute(
            "SELECT quiz_type, COUNT(*) AS attempts, ROUND(AVG(percentage), 2) AS average "
            "FROM quiz_results WHERE user_id = ? GROUP BY quiz_type ORDER BY average DESC", (user_id,)
        ).fetchall()
        by_level = connection.execute(
            "SELECT COALESCE(level, 'All levels') AS level, COUNT(*) AS attempts, "
            "ROUND(AVG(percentage), 2) AS average FROM quiz_results "
            "WHERE user_id = ? GROUP BY level ORDER BY level", (user_id,)
        ).fetchall()
        lessons = connection.execute(
            "SELECT content_type, COUNT(*) AS completed "
            "FROM completed_lessons WHERE user_id = ? GROUP BY content_type ORDER BY content_type", (user_id,)
        ).fetchall()

    type_rows = [dict(row) for row in by_type]
    strongest = type_rows[0] if type_rows else None
    weakest = type_rows[-1] if type_rows else None
    return {
        "quiz_count": summary["quizzes"],
        "average_score": round(summary["average"], 2),
        "strongest_area": strongest,
        "weakest_area": weakest,
        "by_quiz_type": type_rows,
        "by_level": [dict(row) for row in by_level],
        "lessons_by_type": [dict(row) for row in lessons],
    }
