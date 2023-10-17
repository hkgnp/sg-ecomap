import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { content, resourceId } = JSON.parse(req.body);
    try {
      const result = await prisma.post.create({
        data: {
          content: content,
          contentHtml: content,
          authorId: "clmhq8wsc00009kazr0fy1phs",
          resourceId: resourceId,
        },
        include: {
          author: true,
        },
      });
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.status(400).send({ error: "Error saving comment" });
    }
  } else {
    try {
      const result = await prisma.post.findMany({
        where: {
          resourceId: req.query.id as string,
        },
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          author: true,
        },
      });
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.status(400).send([]);
    }
  }
}
