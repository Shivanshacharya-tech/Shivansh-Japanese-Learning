import { useState } from "react";
import Navbar from "../components/Navbar";
import hiragana from "../data/hiragana";

function Hiragana({ onNavigate }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="hiragana-page">
        <h1>ひらがな Hiragana</h1>

        <p>Learn all 46 basic sounds. Select a character to reveal its romaji.</p>

        <p className="hiragana-progress">
          {hiragana.length} characters • {selected ? `Selected: ${selected}` : "Ready to study"}
        </p>

        <div className="hiragana-grid">
          {hiragana.map((item) => (
            <div
              className={`hiragana-card${selected === item.character ? " selected" : ""}`}
              key={item.character}
              role="button"
              tabIndex="0"
              onClick={() => setSelected(item.character)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setSelected(item.character);
                }
              }}
            >
              <span className="hiragana-group">{item.group}</span>
              <h2>{item.character}</h2>

              {selected === item.character && <p>{item.romaji}</p>}

              <button
                onClick={(event) => {
                  event.stopPropagation();

                  if (item.audio) {
                    new Audio(item.audio).play();
                    return;
                  }

                  window.speechSynthesis.cancel();
                  window.speechSynthesis.speak(
                    new SpeechSynthesisUtterance(item.character),
                  );
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

export default Hiragana;
