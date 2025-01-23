import { useState } from "react";
import { getDataFromFirebase } from "../scripts/firebase";
import { useEffect } from "react";
import { DocumentData } from "firebase/firestore";

const Statistics = () => {
	const [permits, setPermits] = useState<DocumentData[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getDataFromFirebase();
			setPermits(data ?? []);
		};
		fetchData();
	}, []);

	return (
		<>
			<div className="w-screen h-[40vh] flex flex-col justify-center items-center content-center">
				<h1 className="text-[3.5rem] text-gray-600 font-bold">:סטטיסטיקות</h1>
				<h1 className="text-3xl text-gray-500 font-bold">
					אישורים שנוצרו: {permits.length}
				</h1>
			</div>
			<div className="w-screen flex flex-col justify-center items-center gap-4 mb-16">
				{permits.map((permit) => (
					<div
						key={permit.time}
						className="flex flex-row-reverse justify-between w-[80%] py-4 px-4 bg-gray-200 border-gray-300 border-[2px] rounded-xl">
						{/* Display permit data here */}
						<p>{permit.name}</p>
						<p>{new Date(permit.time).toLocaleString()}</p>
						{/* ... other permit properties */}
					</div>
				))}
			</div>
		</>
	);
};

export default Statistics;
