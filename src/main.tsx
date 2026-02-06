import { createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen.ts";
import "./styles/tailwind.css";
import "./common/i18n";

const router = createRouter({ routeTree });

export type TanstackRouter = typeof router;

declare module "@tanstack/react-router" {
	interface Register {
		// This infers the type of our router and registers it across your entire project
		router: TanstackRouter;
	}
}

import { TachometerLoader } from "./components/ui/CarLoader";

const rootElement = document.querySelector("#root") as Element;
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<React.Suspense fallback={
				<div className="min-h-screen bg-slate-950 flex items-center justify-center flex-col gap-4">
					<TachometerLoader size={64} />
					<p className="text-slate-500 font-medium animate-pulse">Starting Engine...</p>
				</div>
			}>
				<App router={router} />
			</React.Suspense>
		</React.StrictMode>
	);
}
