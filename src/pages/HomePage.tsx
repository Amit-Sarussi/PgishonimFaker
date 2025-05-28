import { useState } from "react";
import NameInput from "./NameInput";
import Permit from "./Permit";
import { TicTacToe } from "../components/TicTacToe";
import { MiniQuiz } from "../components/MiniQuiz";

type GameType = "ticTacToe" | "miniQuiz";

function HomePage() {
  const [name, setName] = useState("");
  const [onNameEdit, setOnNameEdit] = useState<boolean>(true);

  // Track if user passed the game and which game to play
  const [passedGame, setPassedGame] = useState(false);
  const [gameToPlay, setGameToPlay] = useState<GameType | null>(null);

  const startGame = () => {
    // Pick randomly between two games
    const choice: GameType = Math.random() < 0.5 ? "ticTacToe" : "miniQuiz";
    setGameToPlay(choice);
    setPassedGame(false);
  };

  if (onNameEdit) {
    return (
      <NameInput
        time={1}
        name={name}
        setName={setName}
        setOnNameEdit={(val) => {
          setOnNameEdit(val);
          if (!val) startGame(); // Start game after name submitted
        }}
      />
    );
  }

  if (!passedGame && gameToPlay) {
    // Show chosen game
    return gameToPlay === "ticTacToe" ? (
      <TicTacToe onWin={() => setPassedGame(true)} />
    ) : (
      <MiniQuiz onWin={() => setPassedGame(true)} />
    );
  }

  // Passed the game, show permit
  return <Permit name={name} />;
}

export default HomePage;
