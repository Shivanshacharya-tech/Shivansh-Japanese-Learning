import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { completeReviewItem, getReviewItems } from "../api";

function Review({ onNavigate }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    getReviewItems()
      .then(setItems)
      .catch(() => setOffline(true))
      .finally(() => setLoading(false));
  }, []);

  async function markReviewed(id) {
    try {
      await completeReviewItem(id);
      setItems((current) => current.filter((item) => item.id !== id));
    } catch {
      setOffline(true);
    }
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="review-page">
        <h1>Review Mistakes</h1>
        <p>Practice questions you answered incorrectly.</p>
        {loading && <p>Loading review items...</p>}
        {offline && <p className="progress-warning">The review server is unavailable.</p>}
        {!loading && !offline && items.length === 0 && <p>No mistakes to review. Complete a quiz to build your review list.</p>}
        <div className="review-list">
          {items.map((item) => (
            <article className="review-card" key={item.id}>
              <span>{item.quiz_type} {item.level || ""}</span>
              <h2>{item.prompt}</h2>
              <p>Your answer: <strong>{item.user_answer}</strong></p>
              <p className="review-correct">Correct answer: <strong>{item.correct_answer}</strong></p>
              {item.explanation && <p>{item.explanation}</p>}
              <button onClick={() => markReviewed(item.id)}>Mark reviewed</button>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}

export default Review;