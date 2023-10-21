import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { markInactiveResourceSchema } from "./schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    if (req.query.id) {
      try {
        const result = await prisma.resource.findUnique({
          where: {
            id: req.query.id as string,
          },
        });
        res.status(200).send(result);
      } catch (e) {
        console.log(e);
        res.status(400).send({ error: "Unable to find resource" });
      }
    } else {
      try {
        const result = await prisma.resource.findMany();
        res.status(200).send(result);
      } catch (e) {
        console.log(e);
        res.status(400).send([]);
      }
    }
  } else if (req.method === "POST") {
    const validation = markInactiveResourceSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(422).send(validation.error.errors);
    }
    try {
      const result = await prisma.resource.updateMany({
        where: {
          id: req.body.id,
        },
        data: {
          inactive: req.body.action,
        },
      });
      res.status(200).send({ message: "Resource status updated.", result });
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: "Error changing resource status." });
    }
  }
}

export const getResources = async () => {
  const result = await prisma.resource.findMany({
    select: {
      id: true,
      latitude: true,
      longitude: true,
    },
  });
  return result;
};
