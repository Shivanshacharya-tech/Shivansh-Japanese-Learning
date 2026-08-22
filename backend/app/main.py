from pathlib import Path

import os

from dotenv import dotenv_values

env_values = dotenv_values(Path(__file__).resolve().parent.parent / ".env")
for name, value in env_values.items():
	if value and name not in os.environ:
		os.environ[name] = value

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import initialize_database
from app.routers.progress import router as progress_router
from app.routers.auth import router as auth_router
from app.routers.assistant import router as assistant_router

app = FastAPI(title="Japanese Learning API", version="0.1.0")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
	allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1):\d+$",
	allow_credentials=True,
	allow_methods=["*"],
	allow_headers=["*"],
)

app.include_router(progress_router, prefix="/api")
app.include_router(auth_router, prefix="/api")
app.include_router(assistant_router, prefix="/api")
initialize_database()


@app.get("/")
def root() -> dict[str, str]:
	return {"name": "Shivansh Nihon Learning API", "docs": "/docs", "status": "ok"}


@app.get("/api/health")
def health_check() -> dict[str, str]:
	return {"status": "ok"}
