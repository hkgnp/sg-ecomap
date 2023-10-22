import { router } from "../trpc";
import { resourceRouter } from "./resources.router";

export const appRouter = router({
  resources: resourceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
