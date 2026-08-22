function LessonCard({ title, description, emoji, onClick }) {
  return (
    <div className="lesson-card">
      <div className="lesson-emoji">{emoji}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button onClick={onClick}>Start Learning</button>
    </div>
  );
}

export default LessonCard;