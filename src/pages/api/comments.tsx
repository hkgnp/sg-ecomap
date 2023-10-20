import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/client";
import { commentSchema } from "./schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const validation = commentSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(422).json(validation.error.errors);
    }
    // Verify if captcha is legit
    try {
      const response = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.captcha}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
          },
          method: "POST",
        },
      );
      const captchaValidation = await response.json();
      if (captchaValidation.success) {
        // And create post
        const result = await prisma.post.create({
          data: {
            content: req.body.content,
            contentHtml: req.body.content,
            author: req.body.author,
            resourceId: req.body.resourceId,
          },
        });
        // If legit, save token details
        await prisma.verificationToken.create({
          data: {
            token: req.body.captcha,
            challengeTs: captchaValidation.challenge_ts,
          },
        });
        res.status(200).send(result);
      } else {
        return res
          .status(422)
          .json({ error: "Error processing request. Invalid captcha code." });
      }
    } catch (e) {
      console.log(e);
      res.status(422).send({ error: "Error processing request. Fatal error." });
    }
  } else {
    try {
      const result = await prisma.post.findMany({
        where: {
          resourceId: req.query.id as string,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      res.status(200).send(result);
    } catch (e) {
      console.log(e);
      res.status(400).send([]);
    }
  }
}
