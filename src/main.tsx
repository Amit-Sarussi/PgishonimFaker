import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createHashRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import "./styles/main.css";

// Switch to createHashRouter
const router = createHashRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <NotFound />,
	},
	{
		path: "/stats",
		element: <Statistics />,
	},
]);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>,
);
