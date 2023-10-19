import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    console.log(req.body);
    res.status(200).send("Success");
  } else {
    res.status(404).send("Not found");
  }
}
