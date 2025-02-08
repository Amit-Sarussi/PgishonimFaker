import "../assets/App.css";
import flag from "../assets/flag.jpg";
import home from "../assets/home.png";
import checkmark from "../assets/checkmark.png";
import { useEffect } from "react";

interface PermitProps {
	name: string;
}

function HomePage({ name }: PermitProps) {
	useEffect(() => {
		let timeout: NodeJS.Timeout;

		const handleScroll = () => {
			clearTimeout(timeout);

			timeout = setTimeout(() => {
				window.scrollTo({ top: 0, behavior: "smooth" });
			}, 70); // Adjust delay if needed
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			clearTimeout(timeout);
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

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
			<div className="flex justify-center items-center w-screen h-screen bg-[#173fa1] ariel">
				<div className="w-[90%] h-[95%] flex flex-col items-center gap-4 bg-[rgb(255,255,255,0.85)] rounded-[40px] overflow-hidden">
					<div className="h-[50px] w-full mt-2 flex justify-between items-center">
						<div className="flex justify-center items-center gap-3 ml-4">
							<img className="w-10 rounded-lg" src={flag} alt="Flag" />
							<h2 className="text-[17px] font-semibold" dir="rtl">
								שפה:
							</h2>
						</div>

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
					<div className="h-[30%] flex justify-center items-center">
						<img className="w-[45vw]" src={checkmark} alt="" />
					</div>
					<div className="text-[16px] font-bold ">
						<h2>אושר על ידי: מחנכת כיתה</h2>
					</div>
				</div>
			</div>
			<div className="h-[30dvh] w-full bg-white"></div>
		</>
	);
}

export default HomePage;
