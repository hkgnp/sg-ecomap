import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1),
  resourceId: z.string().cuid(),
  author: z.string().min(1),
  captcha: z.string().min(1),
});

export const markInactiveResourceSchema = z.object({
  id: z.string().cuid(),
  action: z.boolean(),
});
