from datetime import datetime, timezone
from typing import Literal

from fastapi import APIRouter, Header, HTTPException, status
from pydantic import BaseModel, Field

from app.database import (
    clear_progress,
    fetch_analytics,
    fetch_incorrect_answers,
    fetch_progress,
    get_user_by_token,
    mark_answer_reviewed,
    save_incorrect_answer,
    save_lesson,
    save_quiz,
)

router = APIRouter(prefix="/progress", tags=["progress"])


class LessonCompletion(BaseModel):
    content_type: Literal["hiragana", "katakana", "kanji", "grammar"]
    content_id: str = Field(min_length=1, max_length=200)
    level: str | None = Field(default=None, max_length=10)


class QuizResult(BaseModel):
    quiz_type: Literal["hiragana", "katakana", "kanji", "kanji-words", "grammar"]
    level: str | None = Field(default=None, max_length=10)
    score: int = Field(ge=0)
    total: int = Field(gt=0)


class IncorrectAnswer(BaseModel):
    quiz_type: Literal["hiragana", "katakana", "kanji", "kanji-words", "grammar"]
    level: str | None = Field(default=None, max_length=10)
    prompt: str = Field(min_length=1, max_length=1000)
    correct_answer: str = Field(min_length=1, max_length=500)
    user_answer: str = Field(min_length=1, max_length=500)
    explanation: str | None = Field(default=None, max_length=2000)


def current_user_id(authorization: str | None) -> int:
    token = authorization.removeprefix("Bearer ").strip() if authorization else ""
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Login required")
    return user["id"]


@router.get("")
def get_progress(authorization: str | None = Header(default=None)) -> dict:
    return fetch_progress(current_user_id(authorization))


@router.get("/analytics")
def get_analytics(authorization: str | None = Header(default=None)) -> dict:
    return fetch_analytics(current_user_id(authorization))


@router.get("/review")
def get_review(authorization: str | None = Header(default=None)) -> list[dict]:
    return fetch_incorrect_answers(current_user_id(authorization))


@router.post("/review", status_code=201)
def add_review_item(item: IncorrectAnswer, authorization: str | None = Header(default=None)) -> dict:
    record = {
        **item.model_dump(),
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    save_incorrect_answer(record, current_user_id(authorization))
    return record


@router.post("/review/{answer_id}/complete", status_code=204)
def complete_review_item(answer_id: int, authorization: str | None = Header(default=None)) -> None:
    if not mark_answer_reviewed(answer_id, current_user_id(authorization)):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Review item not found")


@router.post("/lessons", status_code=201)
def complete_lesson(completion: LessonCompletion, authorization: str | None = Header(default=None)) -> dict:
    record = {
        **completion.model_dump(),
        "completed_at": datetime.now(timezone.utc).isoformat(),
    }
    save_lesson(record, current_user_id(authorization))
    return record


@router.post("/quizzes", status_code=201)
def save_quiz_result(result: QuizResult, authorization: str | None = Header(default=None)) -> dict:
    record = {
        **result.model_dump(),
        "percentage": round(result.score / result.total * 100, 2),
        "completed_at": datetime.now(timezone.utc).isoformat(),
    }
    save_quiz(record, current_user_id(authorization))
    return record


@router.delete("", status_code=204)
def reset_progress(authorization: str | None = Header(default=None)) -> None:
    clear_progress(current_user_id(authorization))