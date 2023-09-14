import { prisma } from '~/server/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { content, resourceId } = JSON.parse(req.body)
    try {
      const result = await prisma.post.create({
        data: {
          content: content,
          contentHtml: content,
          authorId: 'clmhq8wsc00009kazr0fy1phs',
          resourceId: resourceId,
        },
      })
      res.status(200).json(result)
      res.send('Success')
    } catch (e) {
      res.status(400)
      console.log(e)
      res.send('Failed')
    }
  } else {
    try {
      const result = await prisma.post.findMany({
        where: {
          resourceId: req.query.id as string,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          author: true,
        },
      })
      console.log(result)
      res.status(200).send({ result })
    } catch (e) {
      res.status(400)
      console.log(e)
      res.send('Failed')
    }
  }
}
