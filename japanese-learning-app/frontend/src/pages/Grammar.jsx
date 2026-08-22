import { useState } from "react";
import Navbar from "../components/Navbar";
import grammar, { unitOrder } from "../data/grammar";
import { saveLessonProgress } from "../api";

function Grammar({ onNavigate }) {
  const levels = ["N5", "N4", "N3", "N2", "N1"];
  const [level, setLevel] = useState("N5");
  const [unit, setUnit] = useState(unitOrder[0]);
  const [selected, setSelected] = useState(grammar[0].id);
  const lessons = grammar.filter((lesson) => lesson.level === level && lesson.unit === unit);
  const selectedLesson = lessons.find((lesson) => lesson.id === selected) || lessons[0];

  function changeLevel(nextLevel) {
    const firstUnit = unitOrder.find((item) => grammar.some((lesson) => lesson.level === nextLevel && lesson.unit === item));
    setLevel(nextLevel);
    setUnit(firstUnit);
    setSelected(grammar.find((lesson) => lesson.level === nextLevel && lesson.unit === firstUnit).id);
  }

  function changeUnit(nextUnit) {
    setUnit(nextUnit);
    const lesson = grammar.find((item) => item.level === level && item.unit === nextUnit);
    setSelected(lesson.id);
    saveLessonProgress({
      content_type: "grammar",
      content_id: lesson.id,
      level,
    }).catch(() => {});
  }

  function selectLesson(lesson) {
    setSelected(lesson.id);
    saveLessonProgress({
      content_type: "grammar",
      content_id: lesson.id,
      level: lesson.level,
    }).catch(() => {});
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="grammar-page">
        <header className="grammar-header">
          <h1>日本語 Grammar</h1>
          <p>Understand Japanese patterns with clear English explanations and translations.</p>
        </header>

        <div className="grammar-levels" aria-label="Choose grammar level">
          {levels.map((item) => (
            <button
              className={level === item ? "active" : ""}
              key={item}
              onClick={() => changeLevel(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <nav className="grammar-units" aria-label="Grammar course units">
          {unitOrder.map((item, index) => {
            const hasLessons = grammar.some((lesson) => lesson.level === level && lesson.unit === item);
            return (
              <button
                className={unit === item ? "active" : ""}
                disabled={!hasLessons}
                key={item}
                onClick={() => changeUnit(item)}
              >
                <span>Unit {index + 1}</span>
                {item.replace(/^Lesson \d+: /, "")}
              </button>
            );
          })}
        </nav>

        <div className="grammar-layout">
          <aside className="grammar-list" aria-label={`${level} grammar lessons`}>
            <h2>{level} Lessons</h2>
            {lessons.map((lesson) => (
              <button
                className={selectedLesson.id === lesson.id ? "selected" : ""}
                key={lesson.id}
                onClick={() => selectLesson(lesson)}
              >
                <strong>{lesson.pattern}</strong>
                <span>{lesson.title}</span>
              </button>
            ))}
          </aside>

          <article className="grammar-detail">
            <span className="grammar-badge">{selectedLesson.level}</span>
            <h2>{selectedLesson.pattern}</h2>
            <h3>{selectedLesson.title}</h3>
            <p className="grammar-explanation">{selectedLesson.explanation}</p>

            <section className="grammar-examples">
              <h3>Examples and English translations</h3>
              {selectedLesson.examples.map((example) => (
                <div className="grammar-example" key={example.japanese}>
                  <p className="grammar-japanese">{example.japanese}</p>
                  <p className="grammar-reading">{example.reading}</p>
                  <p className="grammar-english">{example.english}</p>
                </div>
              ))}
            </section>
          </article>
        </div>
      </main>
    </>
  );
}

export default Grammar;
