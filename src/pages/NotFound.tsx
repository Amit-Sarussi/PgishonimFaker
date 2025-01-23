import { Link } from "react-router-dom";

const NotFound = () => {
	return (
		<div className="w-screen h-screen flex flex-col justify-center items-center content-center">
			<h1 className="text-[5rem] text-red-600 font-bold">404!</h1>
			<h1 className="text-3xl text-red-600 font-bold">Page not found...</h1>
			<Link to="/" className="mt-16">
				<div className="bg-gray-300 py-4 px-6 rounded-xl">Go Back</div>
			</Link>
		</div>
	);
};

export default NotFound;
