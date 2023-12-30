import { commentSchema } from "@/pages/api/schema";
import { procedure, router } from "../trpc";
import prisma from "prisma/client";
import { CommentWhereUniqueInputSchema } from "prisma/zod";

export const commentRouter = router({
  find: procedure.input(CommentWhereUniqueInputSchema).query(async (opts) => {
    const { id } = opts.input;
    return await prisma.comment.findMany({
      where: {
        resourceId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }),
  post: procedure.input(commentSchema).mutation(async (opts) => {
    const { captcha, content, author, resourceId } = opts.input;
    const response = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`,
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
      await prisma.comment.create({
        data: {
          content: content,
          contentHtml: content,
          author: author,
          resourceId: resourceId,
          createdAt: new Date(),
        },
      });
      // If legit, save token details
      await prisma.verificationToken.create({
        data: {
          token: captcha,
          challengeTs: captchaValidation.challenge_ts,
        },
      });
    }
  }),
});
