import { useState, useEffect } from "react";
import { saveDataToFirebase } from "../scripts/firebase"; // if needed

interface NameInputProps {
	time: number;
	name: string;
	setName: (name: string) => void;
	setOnNameEdit: (name: boolean) => void;
}

const NameInput = ({ time, name, setName, setOnNameEdit }: NameInputProps) => {
	const [buttonText, setButtonText] = useState(
		`Please wait ${time} seconds...`,
	);
	const [canSubmit, setCanSubmit] = useState(false);

	// Set up a countdown timer
	useEffect(() => {
		let counter = time;
		const timer = setInterval(() => {
			setButtonText(() => {
				if (counter > 1) {
					counter--;
					return `Please wait ${counter} seconds...`;
				} else {
					setCanSubmit(true);
					clearInterval(timer);
					return "Submit";
				}
			});
		}, 1000);

		// Cleanup the timer
		return () => clearInterval(timer);
	}, [time]);

	// Load AdSense script properly
	useEffect(() => {
		if (typeof window !== "undefined" && window.adsbygoogle) {
			try {
				window.adsbygoogle.push({});
			} catch (e) {
				console.error("AdSense error:", e);
			}
		}
	}, []);

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (!name.trim()) return; // Prevent submission if name is empty
		saveDataToFirebase(name);
		setOnNameEdit(false);
	};

	return (
		<div className="flex flex-col justify-center items-center h-screen bg-gray-100 gap-12">
			<div className="w-80 h-60">
				<script
					async
					src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5104275071488401"
					crossOrigin="anonymous"></script>
				<ins
					className="adsbygoogle block"
					data-ad-client="ca-pub-5104275071488401"
					data-ad-slot="4355756984"
					data-ad-format="auto"
					data-full-width-responsive="true"></ins>
			</div>

			<div className="bg-white rounded-lg shadow-lg p-6 w-80">
				<form onSubmit={handleSubmit} className="space-y-4">
					<h2 className="text-xl font-semibold text-gray-800">
						Enter your name
					</h2>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
					/>
					<button
						type="submit"
						className={`w-full py-2 text-white rounded-lg ${
							canSubmit && name.trim()
								? "bg-indigo-600 hover:bg-indigo-500 focus:outline-none"
								: "bg-gray-400"
						}`}
						disabled={!canSubmit || !name.trim()}>
						{buttonText}
					</button>
				</form>
			</div>
			<div className="w-80 h-60"></div>
		</div>
	);
};

export default NameInput;

declare global {
	interface Window {
		adsbygoogle?: any;
	}
}
