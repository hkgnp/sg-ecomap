import { Text } from '@chakra-ui/react'
import { Button, Textarea } from '@opengovsg/design-system-react'
import { useEffect, useState } from 'react'
import { PostProps, PostWithAuthor } from '../types'
import { CommentCard } from './CommentCard'
import { AiOutlineSend } from 'react-icons/ai'

export const Comments = ({ id }: PostProps) => {
  const [postsArr, setPostsArr] = useState<PostWithAuthor[]>()
  const [comment, setComment] = useState<string>()

  const fetchComments = async () => {
    const response = await fetch(
      '/api/comment?' +
        new URLSearchParams({
          id,
        })
    )
    const { result } = await response.json()
    setPostsArr(result)
  }

  useEffect(() => {
    ;(async () => {
      await fetchComments()
    })()
  }, [])

  const writeComment = async () => {
    if (!comment || comment.length == 0) return
    await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        content: comment,
        resourceId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    await fetchComments()
    setComment('')
  }

  return (
    <>
      <Text textStyle="h6" marginTop="5">
        Comments
      </Text>
      <Textarea onChange={(e) => setComment(e.target.value)} value={comment} />
      <Button size="xs" onClick={writeComment}>
        Send
      </Button>
      {postsArr &&
        postsArr.map((p) => (
          <CommentCard
            key={p.id}
            authorName={p.author.name}
            title={p.title}
            content={p.content}
            updatedAt={p.updatedAt}
          />
        ))}
    </>
  )
}
