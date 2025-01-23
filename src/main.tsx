import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";

const router = createBrowserRouter([
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
