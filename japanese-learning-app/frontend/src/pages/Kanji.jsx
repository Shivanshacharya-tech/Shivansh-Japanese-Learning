import { useState } from "react";
import Navbar from "../components/Navbar";
import kanji from "../data/kanji";
import { saveLessonProgress } from "../api";

function Kanji({ onNavigate }) {
  const levels = ["N5", "N4", "N3", "N2", "N1"];
  const [level, setLevel] = useState("N5");
  const [selected, setSelected] = useState(null);
  const visibleKanji = kanji.filter((item) => item.level === level);

  function speak(character) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(character));
  }

  function selectKanji(item) {
    setSelected(item.character);
    saveLessonProgress({
      content_type: "kanji",
      content_id: item.character,
      level: item.level,
    }).catch(() => {});
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="kanji-page">
        <h1>漢字 Kanji</h1>
        <p>Learn Kanji by JLPT level with readings, meanings, and vocabulary.</p>
        <div className="kanji-levels" aria-label="Choose JLPT level">
          {levels.map((item) => (
            <button
              className={level === item ? "active" : ""}
              key={item}
              onClick={() => {
                setLevel(item);
                setSelected(null);
              }}
            >
              {item}
            </button>
          ))}
        </div>
        <p className="kanji-progress">
          {visibleKanji.length} of {kanji.length} characters {selected ? `• Selected: ${selected}` : "• Ready to study"}
        </p>

        <div className="kanji-grid">
          {visibleKanji.map((item) => (
            <div
              className={`kanji-card${selected === item.character ? " selected" : ""}`}
              key={item.character}
              role="button"
              tabIndex="0"
              onClick={() => selectKanji(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  selectKanji(item);
                }
              }}
            >
              <span className="kanji-group">{item.group}</span>
              <h2>{item.character}</h2>
              {selected === item.character && (
                <>
                  <p>{item.romaji}</p>
                  <p className="kanji-meaning">{item.meaning}</p>
                  {item.words.map((word) => (
                    <p className="kanji-word" key={word}>{word}</p>
                  ))}
                </>
              )}
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  speak(item.character);
                }}
              >
                Listen
              </button>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default Kanji;
