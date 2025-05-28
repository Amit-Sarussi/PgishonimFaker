import React, { useEffect, useState } from "react";

type Player = "X" | "O" | null;
type GameResult = "X wins" | "O wins" | "Draw" | null;

const winningCombos = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

interface TicTacToeProps {
	onWin: () => void;
}

export const TicTacToe: React.FC<TicTacToeProps> = ({ onWin }) => {
	const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
	const [result, setResult] = useState<GameResult>(null);
	const [isPlayerTurn, setIsPlayerTurn] = useState(true);

	const checkWinner = (b: Player[]): GameResult => {
		for (const [a, bIdx, c] of winningCombos) {
			if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
				return `${b[a]} wins`;
			}
		}
		return b.every((cell) => cell) ? "Draw" : null;
	};

	const makeMove = (idx: number, player: Player) => {
		const newBoard = [...board];
		newBoard[idx] = player;
		const gameResult = checkWinner(newBoard);
		setBoard(newBoard);
		setResult(gameResult);
		return gameResult;
	};

	const handlePlayerClick = (idx: number) => {
		if (!isPlayerTurn || board[idx] || result) return;

		const res = makeMove(idx, "X");
		if (!res) setIsPlayerTurn(false);
	};

	useEffect(() => {
		if (!isPlayerTurn && !result) {
			const timeout = setTimeout(() => {
				const emptyIndices = board
					.map((cell, i) => (cell === null ? i : null))
					.filter((i) => i !== null) as number[];
				if (emptyIndices.length === 0) return;

				const randomIndex =
					emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
				const res = makeMove(randomIndex, "O");
				if (!res) setIsPlayerTurn(true);
			}, 1);

			return () => clearTimeout(timeout);
		}
	}, [isPlayerTurn, board, result]);

	useEffect(() => {
		if (result === "X wins") onWin();
	}, [result, onWin]);

	const reset = () => {
		setBoard(Array(9).fill(null));
		setResult(null);
		setIsPlayerTurn(true);
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="flex flex-col items-center space-y-6">
				<h1 className="text-2xl font-semibold text-gray-800 text-center">
					כדי להמשיך, תנצחו את המחשב באיקס עיגול
				</h1>
				<div className="grid grid-cols-3 gap-2">
					{board.map((cell, i) => (
						<button
							key={i}
							onClick={() => handlePlayerClick(i)}
							className="w-20 h-20 text-3xl font-bold border rounded shadow flex items-center justify-center bg-white hover:bg-gray-200">
							{cell}
						</button>
					))}
				</div>
				{result && (
					<div className="text-lg font-semibold text-gray-700">{result}</div>
				)}
				{result && result !== "X wins" && (
					<button
						onClick={reset}
						className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-500">
						Try Again
					</button>
				)}
			</div>
		</div>
	);
};
