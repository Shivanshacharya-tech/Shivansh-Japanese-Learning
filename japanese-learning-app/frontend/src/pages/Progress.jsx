import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAnalytics, getProgress } from "../api";

function Progress({ onNavigate }) {
  const [progress, setProgress] = useState({ completed_lessons: [], quiz_results: [] });
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    Promise.all([getProgress(), getAnalytics()])
      .then(([progressData, analyticsData]) => {
        setProgress(progressData);
        setAnalytics(analyticsData);
      })
      .catch(() => setOffline(true))
      .finally(() => setLoading(false));
  }, []);

  const completed = progress.completed_lessons.length;
  const quizzes = progress.quiz_results;
  const average = quizzes.length
    ? Math.round(quizzes.reduce((sum, result) => sum + result.percentage, 0) / quizzes.length)
    : 0;

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="progress-page">
        <h1>Your Progress</h1>
        <p>Track completed lessons and quiz performance.</p>

        {loading && <p>Loading progress...</p>}
        {offline && <p className="progress-warning">The progress server is unavailable. Start the backend to view saved data.</p>}

        {!loading && !offline && (
          <>
            <div className="progress-summary">
              <div><strong>{completed}</strong><span>Lessons completed</span></div>
              <div><strong>{quizzes.length}</strong><span>Quizzes completed</span></div>
              <div><strong>{average}%</strong><span>Average quiz score</span></div>
            </div>

            <section className="analytics-grid">
              <div className="analytics-card">
                <span>Strongest area</span>
                <strong>{analytics?.strongest_area?.quiz_type || "Not enough data"}</strong>
                <small>{analytics?.strongest_area ? `${analytics.strongest_area.average}% average` : "Complete a quiz to see insights"}</small>
              </div>
              <div className="analytics-card">
                <span>Needs practice</span>
                <strong>{analytics?.weakest_area?.quiz_type || "Not enough data"}</strong>
                <small>{analytics?.weakest_area ? `${analytics.weakest_area.average}% average` : "Complete a quiz to see insights"}</small>
              </div>
            </section>

            <section className="progress-section">
              <h2>Performance by level</h2>
              {analytics?.by_level.length ? analytics.by_level.map((item) => (
                <div className="progress-row" key={item.level}>
                  <strong>{item.level}</strong>
                  <span>{item.attempts} attempt{item.attempts === 1 ? "" : "s"}</span>
                  <span>{item.average}% average</span>
                </div>
              )) : <p>Complete a level-based quiz to see performance here.</p>}
            </section>

            <section className="progress-section">
              <h2>Performance by activity</h2>
              {analytics?.by_quiz_type.length ? analytics.by_quiz_type.map((item) => (
                <div className="progress-row" key={item.quiz_type}>
                  <strong>{item.quiz_type}</strong>
                  <span>{item.attempts} attempt{item.attempts === 1 ? "" : "s"}</span>
                  <span>{item.average}% average</span>
                </div>
              )) : <p>Complete a quiz to see activity insights.</p>}
            </section>

            <section className="progress-section">
              <h2>Recent quiz results</h2>
              {quizzes.length === 0 ? <p>No quiz results yet.</p> : quizzes.slice(-10).reverse().map((result, index) => (
                <div className="progress-row" key={`${result.completed_at}-${index}`}>
                  <strong>{result.quiz_type}</strong>
                  <span>{result.level || "All levels"}</span>
                  <span>{result.score} / {result.total} ({result.percentage}%)</span>
                </div>
              ))}
            </section>
          </>
        )}
      </main>
    </>
  );
}

export default Progress;
