import { procedure, router } from "../trpc";
import prisma from "../../../prisma/client";
import { markInactiveResourceSchema } from "@/pages/api/schema";
import { ResourceWhereUniqueInputSchema } from "prisma/zod";

export const resourceRouter = router({
  findAll: procedure.query(async () => {
    return await prisma.resource.findMany();
  }),
  findOne: procedure
    .input(ResourceWhereUniqueInputSchema)
    .query(async (opts) => {
      const { id } = opts.input;
      return await prisma.resource.findUnique({
        where: {
          id,
        },
      });
    }),
  updateActive: procedure
    .input(markInactiveResourceSchema)
    .mutation(async (opts) => {
      const { id, action } = opts.input;
      return await prisma.resource.updateMany({
        where: {
          id,
        },
        data: {
          inactive: action,
        },
      });
    }),
});
