import { createRootRoute } from "@tanstack/react-router";
import { NotFoundPage } from "../components/NotFoundPage";

export const Route = createRootRoute({
    notFoundComponent: NotFoundPage,
});
