import React, { useState } from "react";

const questions = [
  {
    question: "תבחר את המספר שאני חושב עליו",
    options: ["35", "51", "90", "27"],
    answer: "51",
  },
  {
    question: "450 x 18",
    options: ["2", "9000", "6700", "8100"],
    answer: "8100",
  },
  {
    question: "מעבר חינם תלחצו על 3",
    options: ["1", "2", "3", "4"],
    answer: "2",
  },
  {
    question: "מהו צבע השמיים ביום בהיר",
    options: ["אדום", "ירוק", "כחול", "צהוב"],
    answer: "כחול",
  },
  {
    question: "מהו צבע הדם",
    options: ["אדום", "ירוק", "כחול", "צהוב"],
    answer: "אדום",
  },
  {
    question: "כמה יבשות יש בעולם",
    options: ["5", "6", "7", "8"],
    answer: "7",
  },
];

interface MiniQuizProps {
  onWin: () => void;
}

export const MiniQuiz: React.FC<MiniQuizProps> = ({ onWin }) => {
  const shuffled = questions.sort(() => 0.5 - Math.random()).slice(0, 3);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quiz, setQuiz] = useState(shuffled);

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);

    if (option === quiz[current].answer) {
      setScore((s) => s + 1);
    }

    setTimeout(() => {
      setSelected(null);
      if (current + 1 < quiz.length) {
        setCurrent((c) => c + 1);
      } else {
        setShowResult(true);
        if (score + (option === quiz[current].answer ? 1 : 0) >= 2) {
          onWin();
        }
      }
    }, 800);
  };

  const reset = () => {
    setQuiz(questions.sort(() => 0.5 - Math.random()).slice(0, 3));
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-[350px] text-center space-y-4">
        {!showResult ? (
          <>
            <h2 className="text-lg font-semibold">
              Question {current + 1} of {quiz.length}
            </h2>
            <p className="text-gray-800 font-medium">
              {quiz[current].question}
            </p>
            <div className="grid grid-cols-1 gap-2">
              {quiz[current].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  className={`py-2 px-4 rounded border transition-all ${
                    selected
                      ? option === quiz[current].answer
                        ? "bg-green-400 text-white"
                        : option === selected
                        ? "bg-red-400 text-white"
                        : "bg-gray-100"
                      : "hover:bg-indigo-100 bg-gray-50"
                  }`}
                  disabled={!!selected}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">Quiz Over</h2>
            <p className="text-gray-700">You scored {score} / 3</p>
            {score < 3 && (
              <button
                onClick={reset}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500"
              >
                Try Again
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
