import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import hiragana from "../data/hiragana";
import katakana from "../data/katakana";
import kanji from "../data/kanji";
import grammar from "../data/grammar";
import { saveIncorrectAnswer, saveQuizProgress } from "../api";

const kanjiWords = kanji.flatMap((item) =>
  item.words.map((word) => {
    const [term, ...meaningParts] = word.split(" - ");
    const match = term.match(/^(.*) \((.*)\)$/);

    return {
      character: item.character,
      word: match ? match[1] : term,
      romaji: match ? match[2] : term,
      meaning: meaningParts.join(" - "),
      level: item.level,
    };
  }),
);

const grammarQuestions = grammar.flatMap((lesson) =>
  lesson.examples.map((example) => ({
    prompt: example.english,
    japanese: example.japanese,
    romaji: lesson.pattern,
    meaning: `${lesson.title}: ${lesson.explanation}`,
    level: lesson.level,
  })),
);

function Quiz({ onNavigate }) {
  const [quizType, setQuizType] = useState("hiragana");
  const [kanjiLevel, setKanjiLevel] = useState("N5");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const quizData = quizType === "hiragana"
    ? hiragana
    : quizType === "katakana"
      ? katakana
      : quizType === "kanji"
        ? kanji.filter((item) => item.level === kanjiLevel)
        : quizType === "kanji-words"
          ? kanjiWords.filter((item) => item.level === kanjiLevel)
          : grammarQuestions.filter((item) => item.level === kanjiLevel);
  const question = quizData[currentQuestion];
  const resultSaved = useRef(false);
  const answerPool = [...new Set(quizData.map((item) => item.romaji))];
  const answers = [...new Set(
    quizData
      .slice(currentQuestion, currentQuestion + 4)
      .map((item) => item.romaji),
  )];

  for (const answer of answerPool) {
    if (answers.length >= 4) break;
    if (!answers.includes(answer)) answers.push(answer);
  }

  function handleAnswer(answer) {
    if (selectedAnswer) {
      return;
    }

    setSelectedAnswer(answer);

    if (answer === question.romaji) {
      setScore(score + 1);
    } else {
      saveIncorrectAnswer({
        quiz_type: quizType,
        level: ["kanji", "kanji-words", "grammar"].includes(quizType) ? kanjiLevel : null,
        prompt: question.prompt || question.word || question.character,
        correct_answer: question.romaji,
        user_answer: answer,
        explanation: question.meaning || null,
      }).catch(() => {});
    }
  }

  function nextQuestion() {
    setSelectedAnswer(null);

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  function changeQuizType(type) {
    setQuizType(type);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    resultSaved.current = false;
  }

  function changeKanjiLevel(level) {
    setKanjiLevel(level);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    resultSaved.current = false;
  }

  function restartQuiz() {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    resultSaved.current = false;
  }

  const isComplete = Boolean(question && currentQuestion === quizData.length - 1 && selectedAnswer);

  useEffect(() => {
    if (!isComplete || resultSaved.current) return;

    resultSaved.current = true;
    saveQuizProgress({
      quiz_type: quizType,
      level: ["kanji", "kanji-words", "grammar"].includes(quizType) ? kanjiLevel : null,
      score: score + (selectedAnswer === question.romaji ? 1 : 0),
      total: quizData.length,
    }).catch(() => {
      resultSaved.current = false;
    });
  }, [isComplete, kanjiLevel, question, quizData.length, quizType, score, selectedAnswer]);

  if (!question) {
    return (
      <>
        <Navbar onNavigate={onNavigate} />
        <main className="quiz-page">
          <h1>No questions available</h1>
          <p>Choose another quiz level.</p>
        </main>
      </>
    );
  }

  const quizTitle = quizType === "kanji-words"
    ? "Kanji Words"
    : quizType[0].toUpperCase() + quizType.slice(1);

  if (currentQuestion === quizData.length - 1 && selectedAnswer) {
    return (
      <>
        <Navbar onNavigate={onNavigate} />
        <main className="quiz-page">
          <h1>{quizTitle} Quiz Complete</h1>
          <p>You scored {score} out of {quizData.length}.</p>
          <button onClick={restartQuiz}>Try Again</button>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <main className="quiz-page">
        <div className="quiz-modes" aria-label="Choose quiz type">
          <button
            className={quizType === "hiragana" ? "active" : ""}
            onClick={() => changeQuizType("hiragana")}
          >
            Hiragana
          </button>
          <button
            className={quizType === "katakana" ? "active" : ""}
            onClick={() => changeQuizType("katakana")}
          >
            Katakana
          </button>
          <button
            className={quizType === "kanji" ? "active" : ""}
            onClick={() => changeQuizType("kanji")}
          >
            Kanji
          </button>
          <button
            className={quizType === "kanji-words" ? "active" : ""}
            onClick={() => changeQuizType("kanji-words")}
          >
            Kanji Words
          </button>
          <button
            className={quizType === "grammar" ? "active" : ""}
            onClick={() => changeQuizType("grammar")}
          >
            Grammar
          </button>
        </div>

        <h1>{quizTitle} Quiz</h1>

        {(quizType === "kanji" || quizType === "kanji-words" || quizType === "grammar") && (
          <div className="quiz-levels" aria-label="Choose Kanji JLPT level">
            {["N5", "N4", "N3", "N2", "N1"].map((level) => (
              <button
                className={kanjiLevel === level ? "active" : ""}
                key={level}
                onClick={() => changeKanjiLevel(level)}
              >
                {level}
              </button>
            ))}
          </div>
        )}

      <p>
        Question {currentQuestion + 1} / {quizData.length}
      </p>

      <div className="quiz-card">
        <h2>{question.prompt || question.word || question.character}</h2>

        {question.word && <p>Kanji: {question.character}</p>}
        {selectedAnswer && question.japanese && <p className="quiz-japanese">Japanese: {question.japanese}</p>}

        <div className="answers">
          {answers.map((answer) => (
            <button key={answer} onClick={() => handleAnswer(answer)} disabled={selectedAnswer !== null}>
              {answer}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <p>
            {selectedAnswer === question.romaji
              ? "✅ Correct!"
              : `❌ Incorrect! Answer: ${question.romaji}`}
          </p>
        )}

        {selectedAnswer && question.meaning && <p>{question.meaning}</p>}

        {selectedAnswer && (
          <button onClick={nextQuestion}>
            Next Question
          </button>
        )}

        <p>Score: {score}</p>
      </div>
      </main>
    </>
  );
}

export default Quiz;