import { useState } from "react";
import Navbar from "../components/Navbar";
import { askAssistant } from "../api";

function Assistant({ onNavigate }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "こんにちは! Ask me about Japanese grammar, Kanji, vocabulary, or translation." },
  ]);
  const [question, setQuestion] = useState("");
  const [sending, setSending] = useState(false);

  async function submitQuestion(event) {
    event.preventDefault();
    const content = question.trim();
    if (!content || sending) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setQuestion("");
    setSending(true);
    try {
      const response = await askAssistant(nextMessages);
      setMessages([...nextMessages, { role: "assistant", content: response.answer }]);
    } catch {
      setMessages([...nextMessages, { role: "assistant", content: "I could not reach the assistant service. Please make sure the backend is running." }]);
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="assistant-page">
        <header>
          <h1>Japanese Study Assistant</h1>
          <p>Ask for translations, grammar explanations, readings, and study guidance.</p>
        </header>
        <section className="assistant-chat" aria-live="polite">
          {messages.map((message, index) => (
            <div className={`assistant-message ${message.role}`} key={`${message.role}-${index}`}>
              <span>{message.role === "assistant" ? "Assistant" : "You"}</span>
              <p>{message.content}</p>
            </div>
          ))}
          {sending && <p className="assistant-status">Thinking...</p>}
        </section>
        <form className="assistant-form" onSubmit={submitQuestion}>
          <input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask something about Japanese..." maxLength="4000" />
          <button disabled={sending || !question.trim()}>Send</button>
        </form>
      </main>
    </>
  );
}

export default Assistant;