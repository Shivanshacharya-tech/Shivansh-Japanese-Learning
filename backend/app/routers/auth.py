import os
from pathlib import Path
from dotenv import dotenv_values

from fastapi import APIRouter, Header, HTTPException, status
from pydantic import BaseModel, Field

from app.database import authenticate_user, create_session, create_user, delete_session, get_user_by_token

router = APIRouter(prefix="/auth", tags=["auth"])


class Credentials(BaseModel):
    username: str = Field(min_length=3, max_length=40, pattern=r"^[A-Za-z0-9_-]+$")
    password: str = Field(min_length=8, max_length=128)


class PasswordResetRequest(BaseModel):
    username: str = Field(min_length=3, max_length=40, pattern=r"^[A-Za-z0-9_-]+$")


@router.post("/register", status_code=201)
def register(credentials: Credentials) -> dict:
    try:
        user = create_user(credentials.username, credentials.password)
    except ValueError as error:
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=str(error)) from error
    return {"user": user, "token": create_session(user["id"])}


@router.post("/login")
def login(credentials: Credentials) -> dict:
    user = authenticate_user(credentials.username, credentials.password)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid username or password")
    return {"user": user, "token": create_session(user["id"])}


@router.get("/me")
def current_user(authorization: str | None = Header(default=None)) -> dict:
    token = authorization.removeprefix("Bearer ").strip() if authorization else ""
    user = get_user_by_token(token)
    if user is None:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid session")
    return user


@router.post("/logout", status_code=204)
def logout(authorization: str | None = Header(default=None)) -> None:
    token = authorization.removeprefix("Bearer ").strip() if authorization else ""
    delete_session(token)


@router.post("/password-reset/request")
def request_password_reset(request: PasswordResetRequest) -> dict[str, str]:
    # A real reset must deliver a one-time token by email; no mail provider is configured yet.
    return {"message": "Password reset requests are accepted. Email delivery must be configured by the administrator."}


@router.get("/{provider}/start")
def start_oauth(provider: str) -> dict[str, str]:
    if provider not in {"google", "github"}:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Unsupported provider")
    env_values = dotenv_values(Path(__file__).resolve().parent.parent.parent / ".env")
    configured = bool(
        (os.getenv(f"{provider.upper()}_CLIENT_ID") or env_values.get(f"{provider.upper()}_CLIENT_ID"))
        and (os.getenv(f"{provider.upper()}_CLIENT_SECRET") or env_values.get(f"{provider.upper()}_CLIENT_SECRET"))
    )
    return {
        "configured": str(configured).lower(),
        "message": (
            f"{provider.title()} OAuth credentials detected."
            if configured
            else f"{provider.title()} OAuth is not configured yet. Add its client ID and secret to enable it."
        ),
    }
