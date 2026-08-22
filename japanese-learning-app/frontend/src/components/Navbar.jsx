import { logoutFromServer } from "../api";

function Navbar({ onNavigate }) {
  function navigate(event, page) {
    event.preventDefault();
    onNavigate(page);
  }

  return (
    <nav>
      <h2>Shivansh Nihon Learning</h2>

      <div>
        <a href="#" onClick={(event) => navigate(event, "home")}>Home</a>
        <a href="#" onClick={(event) => navigate(event, "hiragana")}>Hiragana</a>
        <a href="#" onClick={(event) => navigate(event, "katakana")}>Katakana</a>
        <a href="#" onClick={(event) => navigate(event, "kanji")}>Kanji</a>
        <a href="#" onClick={(event) => navigate(event, "grammar")}>Grammar</a>
        <a href="#" onClick={(event) => navigate(event, "quiz")}>Quiz</a>
        <a href="#" onClick={(event) => navigate(event, "progress")}>Progress</a>
        <a href="#" onClick={(event) => navigate(event, "review")}>Review</a>
        <a href="#" onClick={(event) => navigate(event, "about")}>About</a>
        <a href="#" onClick={(event) => navigate(event, "assistant")}>AI Assistant</a>
        <button className="logout-button" onClick={async () => { await logoutFromServer(); window.location.reload(); }}>Log out</button>
      </div>
    </nav>
  );
}

export default Navbar;