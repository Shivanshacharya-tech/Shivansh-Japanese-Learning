const API_BASE_URL = "http://127.0.0.1:8000/api";

async function request(path, options = {}) {
  const token = localStorage.getItem("japanese_learning_token");
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  if (!response.ok) {
    let detail = `API request failed: ${response.status}`;
    try {
      const body = await response.json();
      detail = body.detail || detail;
    } catch {
      // Preserve the status if the server does not return JSON.
    }
    throw new Error(detail);
  }

  return response.status === 204 ? null : response.json();
}

export function register(username, password) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function login(username, password) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
}

export function requestPasswordReset(username) {
  return request("/auth/password-reset/request", {
    method: "POST",
    body: JSON.stringify({ username }),
  });
}

export function startOAuth(provider) {
  return request(`/auth/${provider}/start`);
}

export function getCurrentUser() {
  return request("/auth/me");
}

export function logout() {
  localStorage.removeItem("japanese_learning_token");
}

export async function logoutFromServer() {
  try {
    await request("/auth/logout", { method: "POST" });
  } finally {
    logout();
  }
}

export function saveLessonProgress(lesson) {
  return request("/progress/lessons", {
    method: "POST",
    body: JSON.stringify(lesson),
  });
}

export function saveQuizProgress(result) {
  return request("/progress/quizzes", {
    method: "POST",
    body: JSON.stringify(result),
  });
}

export function getProgress() {
  return request("/progress");
}

export function getAnalytics() {
  return request("/progress/analytics");
}

export function saveIncorrectAnswer(item) {
  return request("/progress/review", {
    method: "POST",
    body: JSON.stringify(item),
  });
}

export function getReviewItems() {
  return request("/progress/review");
}

export function completeReviewItem(answerId) {
  return request(`/progress/review/${answerId}/complete`, { method: "POST" });
}

export function askAssistant(messages) {
  return request("/assistant/chat", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });
}
