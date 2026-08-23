import { useState } from "react";
import { login, register, requestPasswordReset, startOAuth } from "../api";

function Auth({ initialError = "", onAuthenticated }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(initialError);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);

    try {
      if (mode === "forgot") {
        const response = await requestPasswordReset(username);
        setNotice(response.message);
        return;
      }
      const response = mode === "login" ? await login(username, password) : await register(username, password);
      localStorage.setItem("japanese_learning_token", response.token);
      onAuthenticated(response.user);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleProvider(provider) {
    setError("");
    setNotice("");
    startOAuth(provider);
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>Shivansh Nihon Learning</h1>
        <p>{mode === "login" ? "Sign in to continue learning." : mode === "register" ? "Create your learning account." : "Request a password reset."}</p>
        <form onSubmit={handleSubmit}>
          <label>
            Username
            <input value={username} onChange={(event) => setUsername(event.target.value)} required minLength="3" />
          </label>
          {mode !== "forgot" && <label>
            Password
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required minLength="8" />
          </label>}
          {error && <p className="auth-error">{error}</p>}
          {notice && <p className="auth-notice">{notice}</p>}
          <button disabled={submitting}>{submitting ? "Please wait..." : mode === "login" ? "Sign In" : mode === "register" ? "Create Account" : "Request Reset"}</button>
        </form>
        {mode === "login" && <>
          <button type="button" className="social-button" onClick={() => handleProvider("google")}>Continue with Google</button>
          <button type="button" className="social-button" onClick={() => handleProvider("github")}>Continue with GitHub</button>
          <button className="auth-switch" onClick={() => { setMode("forgot"); setError(""); setNotice(""); }}>Forgot password?</button>
        </>}
        <button className="auth-switch" onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); setNotice(""); }}>
          {mode === "login" ? "Create a new account" : "Back to sign in"}
        </button>
      </section>
    </main>
  );
}

export default Auth;
