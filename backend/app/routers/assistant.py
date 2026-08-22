import json
import os
from typing import Literal
from urllib.parse import quote
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from fastapi import APIRouter, Header
from pydantic import BaseModel, Field

from app.routers.progress import current_user_id

router = APIRouter(prefix="/assistant", tags=["assistant"])


class ChatMessage(BaseModel):
    role: Literal["user", "assistant"]
    content: str = Field(min_length=1, max_length=4000)


class ChatRequest(BaseModel):
    messages: list[ChatMessage] = Field(min_length=1, max_length=20)


def local_answer(question: str) -> str:
    text = question.lower()
    if "は" in question or "wa" in text:
        return "は (wa) marks the topic of a sentence. For example, 私は学生です means 'I am a student.'"
    if "て form" in text or "て-form" in text or "て形" in question:
        return "The て-form connects actions and helps build patterns such as てください (please do) and ています (be doing)."
    if "kanji" in text or "漢字" in question:
        return "Try breaking a Kanji word into meaning and reading. Use the Kanji page to study by JLPT level, then use Kanji Words Quiz to practice vocabulary."
    if "grammar" in text or "文法" in question:
        return "Start with N5 nouns and particles, then adjectives, verbs, tense, and sentence patterns. Choose Grammar from the navigation to study explanations with translations."
    if "translate" in text or "translation" in text or "意味" in question:
        return "Send me a Japanese sentence and I can help explain its likely meaning, particles, and grammar structure."
    return "I can help you study Japanese. Ask about a grammar pattern, Kanji reading, vocabulary meaning, or an English-to-Japanese translation."


def model_answer(messages: list[ChatMessage]) -> str | None:
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        return None

    model = os.getenv("GEMINI_MODEL") or "gemini-3.6-flash"
    endpoint = (
        "https://generativelanguage.googleapis.com/v1beta/models/"
        f"{quote(model, safe='')}:generateContent?key={quote(api_key, safe='')}"
    )
    payload = {
        "systemInstruction": {
            "parts": [{"text": "You are a patient Japanese teacher. Explain Japanese clearly in English, include readings, translations, and one short example. Keep answers concise."}],
        },
        "contents": [
            {
                "role": "model" if message.role == "assistant" else "user",
                "parts": [{"text": message.content}],
            }
            for message in messages
        ],
        "generationConfig": {"temperature": 0.3},
    }
    request = Request(
        endpoint,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urlopen(request, timeout=20) as response:
            result = json.loads(response.read().decode("utf-8"))
        return result["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, TimeoutError, OSError, HTTPError, URLError, json.JSONDecodeError):
        return None


@router.post("/chat")
def chat(payload: ChatRequest, authorization: str | None = Header(default=None)) -> dict[str, str]:
    current_user_id(authorization)
    answer = model_answer(payload.messages) or local_answer(payload.messages[-1].content)
    return {"answer": answer}
