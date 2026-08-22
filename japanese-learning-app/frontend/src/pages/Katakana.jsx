import { useState } from "react";
import Navbar from "../components/Navbar";
import katakana from "../data/katakana";

function Katakana({ onNavigate }) {
  const [selected, setSelected] = useState(null);

  function speak(character) {
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(character));
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="kana-page">
        <h1>カタカナ Katakana</h1>
        <p>Learn all 46 basic sounds used for foreign words and names.</p>
        <p className="kana-progress">
          {katakana.length} characters {selected ? `• Selected: ${selected}` : "• Ready to study"}
        </p>

        <div className="kana-grid">
          {katakana.map((item) => (
            <div
              className={`kana-card${selected === item.character ? " selected" : ""}`}
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
              <span className="kana-group">{item.group}</span>
              <h2>{item.character}</h2>
              {selected === item.character && <p>{item.romaji}</p>}
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

export default Katakana;
