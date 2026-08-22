import Navbar from "../components/Navbar";
import LessonCard from "../components/LessonCard";

function Home({ onNavigate }) {
  return (
    <>
      <Navbar onNavigate={onNavigate} />

      <main>
        <section className="hero">
          <h1>Learn Japanese 🇯🇵</h1>

          <p>
            Start your Japanese journey from zero and learn step by step.
          </p>

          <button onClick={() => onNavigate("hiragana")}>Start Learning</button>
        </section>

        <section className="lessons">
          <h2>Start Learning</h2>

          <div className="lesson-grid">
            <LessonCard
              title="Hiragana"
              description="Learn the basic Japanese phonetic alphabet."
              emoji="あ"
              onClick={() => onNavigate("hiragana")}
            />

            <LessonCard
              title="Katakana"
              description="Learn the writing system commonly used for foreign words."
              emoji="カ"
              onClick={() => onNavigate("katakana")}
            />

            <LessonCard
              title="Vocabulary"
              description="Build your Japanese vocabulary with useful words."
              emoji="言"
              onClick={() => onNavigate("kanji")}
            />

            <LessonCard
              title="Grammar"
              description="Understand how Japanese sentences are constructed."
              emoji="文"
              onClick={() => onNavigate("grammar")}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;