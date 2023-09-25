import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '~/server/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await prisma.resource.findMany()
    res.status(200).send(result)
  } catch (e) {
    console.log(e)
    res.status(400).send([])
  }
}
