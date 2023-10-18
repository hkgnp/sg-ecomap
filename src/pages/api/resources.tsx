import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const result = await prisma.resource.findMany();
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(400).send([]);
  }
}

export const getResources = async () => {
  const result = await prisma.resource.findMany();
  return result;
};
