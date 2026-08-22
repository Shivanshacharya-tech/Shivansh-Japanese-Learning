import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Hiragana from "./pages/Hiragana";
import Katakana from "./pages/Katakana";
import Kanji from "./pages/Kanji";
import Grammar from "./pages/Grammar";
import Progress from "./pages/Progress";
import Quiz from "./pages/Quiz";
import Review from "./pages/Review";
import About from "./pages/About";
import Assistant from "./pages/Assistant";
import Auth from "./pages/Auth";
import { getCurrentUser, logout } from "./api";

function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(Boolean(localStorage.getItem("japanese_learning_token")));

  useEffect(() => {
    if (!checkingAuth) return;
    getCurrentUser()
      .then(setUser)
      .catch(() => logout())
      .finally(() => setCheckingAuth(false));
  }, [checkingAuth]);

  if (checkingAuth) {
    return <main className="auth-page"><p>Loading account...</p></main>;
  }

  if (!user) {
    return <Auth onAuthenticated={setUser} />;
  }

  if (page === "hiragana") {
    return <Hiragana onNavigate={setPage} />;
  }

  if (page === "quiz") {
    return <Quiz onNavigate={setPage} />;
  }

  if (page === "katakana") {
    return <Katakana onNavigate={setPage} />;
  }

  if (page === "kanji") {
    return <Kanji onNavigate={setPage} />;
  }

  if (page === "grammar") {
    return <Grammar onNavigate={setPage} />;
  }

  if (page === "progress") {
    return <Progress onNavigate={setPage} />;
  }

  if (page === "review") {
    return <Review onNavigate={setPage} />;
  }

  if (page === "about") {
    return <About onNavigate={setPage} />;
  }

  if (page === "assistant") {
    return <Assistant onNavigate={setPage} />;
  }

  return <Home onNavigate={setPage} />;
}

export default App;