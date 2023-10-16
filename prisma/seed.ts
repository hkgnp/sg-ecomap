/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // const userData = [
  //   {
  //     name: 'John Doe',
  //     username: 'johndoe',
  //     email: 'johndoe@example.com',
  //     image: 'https://example.com/johndoe.jpg',
  //     bio: 'A sample user bio.',
  //   },
  //   {
  //     name: 'Alice Smith',
  //     username: 'alicesmith',
  //     email: 'alicesmith@example.com',
  //     image: 'https://example.com/alicesmith.jpg',
  //     bio: 'Another sample user bio.',
  //   },
  // ]
  // for (const d of userData) {
  //   await prisma.user.create({
  //     data: d,
  //   })
  // }
  const postData = [
    {
      title: 'Post 1',
      content: 'This is the content of Post 1.',
      contentHtml: 'This is the content of Post 1.',
      authorId: 'clmhq8wsc00009kazr0fy1phs',
      resourceId: 'f5nuzxsm3mr2zdwfyqx447v4',
    },
    {
      title: 'Post 2',
      content: 'This is the content of Post 2.',
      contentHtml: 'This is the content of Post 2.',
      authorId: 'clmhq8wsc00009kazr0fy1phs',
      resourceId: 'f5nuzxsm3mr2zdwfyqx447v4',
    },
  ]
  for (const d of postData) {
    await prisma.post.create({
      data: d,
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
