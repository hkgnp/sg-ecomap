import { z } from "zod";

export const commentSchema = z.object({
  content: z.string().min(1).max(500),
  resourceId: z.string().min(1),
  author: z.string().min(1),
  captcha: z.string().min(1),
});

export const markInactiveResourceSchema = z.object({
  id: z.string().min(1),
  action: z.boolean(),
});
