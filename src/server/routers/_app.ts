import { router } from "../trpc";
import { commentRouter } from "./comments.router";
import { resourceRouter } from "./resources.router";

export const appRouter = router({
  resources: resourceRouter,
  comments: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
