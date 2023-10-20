import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "GET") {
    if (req.query) {
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
    const { id, action } = req.body;
    try {
      const result = await prisma.resource.updateMany({
        where: {
          id: id,
        },
        data: {
          inactive: action,
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
  const result = await prisma.resource.findMany();
  return result;
};
