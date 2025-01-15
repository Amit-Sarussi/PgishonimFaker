import "./App.css";
import flag from "./assets/flag.jpg";
import home from "./assets/home.png";
import checkmark from "./assets/checkmark.png";
import fullscreenicon from "./assets/fullscreen.png";
import Modal from "react-modal";
import { useState } from "react";

Modal.setAppElement("#root"); // Set the app root for accessibility

function App() {
	const [modalIsOpen, setModalIsOpen] = useState(true);
	const [name, setName] = useState("");

	const handleNameSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setModalIsOpen(false);
	};
	const [isFullScreen, setIsFullScreen] = useState(false);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			// Request full screen
			if (document.documentElement.requestFullscreen) {
				document.documentElement.requestFullscreen();
			}
			setIsFullScreen(true);
		} else {
			// Exit full screen
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
			setIsFullScreen(false);
		}
	};

	const today = new Date();
	const date = `${String(today.getDate()).padStart(2, "0")}/${String(
		today.getMonth() + 1,
	).padStart(2, "0")}/${String(today.getFullYear()).slice(2)}`;
	const now = new Date();

	// Calculate the closest floored hour
	const startHour = now.getHours();
	const endHour = startHour + 2;

	// Format the hours as "HH:00"
	const start_time = `${String(startHour).padStart(2, "0")}:00`;
	const end_time = `${String(endHour).padStart(2, "0")}:00`;

	return (
		<>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={() => setModalIsOpen(false)}
				className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50"
				overlayClassName="">
				<div className="bg-white rounded-lg shadow-lg p-6 w-80">
					<form onSubmit={handleNameSubmit} className="space-y-4">
						<h2 className="text-xl font-semibold text-gray-800">
							Enter your name
						</h2>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
						/>
						<button
							type="submit"
							className="w-full py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none">
							Submit
						</button>
					</form>
				</div>
			</Modal>

			<div className="absolute top-0 left-0 flex justify-center items-center w-screen h-screen bg-[#173fa1] ariel">
				<div className="w-[90%] h-[95%] flex flex-col items-center gap-4 bg-[rgb(255,255,255,0.85)] rounded-[40px] overflow-hidden">
					<div className="h-[50px] w-full mt-2 flex justify-between items-center">
						<div className="flex justify-center items-center gap-3 ml-4">
							<img className="w-10 rounded-lg" src={flag} alt="Flag" />
							<h2 className="text-[17px] font-semibold" dir="rtl">
								שפה:
							</h2>
						</div>
						<button onClick={toggleFullScreen}>
							<img className="w-8" src={fullscreenicon} alt="" />
						</button>
						<img className="w-8 rounded-lg mr-4" src={home} alt="home" />
					</div>

					<h2 className="text-[20px] font-bold">הדפסת אישור יציאה</h2>
					<div className="text-[16px] font-bold flex justify-between flex-row-reverse w-[90%]">
						<h2>תאריך: {date}</h2>
						<h2>
							שעת השחרור: {start_time} - {end_time}
						</h2>
					</div>
					<div className="text-[16px] font-bold flex justify-between flex-row-reverse w-[90%]">
						<h2>שם התלמיד: {name}</h2>
						<h2>כיתה : יב2</h2>
					</div>
					<div className="text-[16px] font-bold flex justify-between flex-row-reverse w-[90%]">
						<h2>סיבה: חלון</h2>
						<h2>
							סטטוס :{" "}
							<span className="bg-[#028851] text-[#fff] text-[14px] p-2 rounded-md">
								אושר
							</span>
						</h2>
					</div>
					<div className="text-[16px] font-bold flex justify-between flex-row-reverse w-[90%]">
						<h2>מחזוריות: חד פעמי</h2>
					</div>
					<div className="text-[16px] font-bold flex justify-between flex-row-reverse w-[90%]">
						<h2>שעת יציאה: 00:00</h2>
						<h2>שעת חזרה: 00:00</h2>
					</div>
					<div className="w-[90%] h-[50px] bg-gradient-to-r from-[#01dbdd] to-[#193ea7] rounded-[15px] flex justify-center items-center">
						<h1 className="text-white text-[18px] font-bold" dir="rtl">
							עדכון יציאה מבית הספר!
						</h1>
					</div>
					<div className="h-[40%] flex justify-center items-center">
						<img className="w-[55vw]" src={checkmark} alt="" />
					</div>
					<div className="text-[16px] font-bold ">
						<h2>אושר על ידי: מחנכת כיתה</h2>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
