import { Text } from '@chakra-ui/react'
import { Textarea } from '@opengovsg/design-system-react'
import { PostProps } from '../types'
import { CommentCard } from './CommentCard'

export const Comments = ({ posts }: PostProps) => {
  return (
    <>
      <Text textStyle="h6" marginTop="5">
        Comments
      </Text>
      <Textarea size="xs" fontSize="16px" marginY="3" />
      {posts.map((p) => (
        <CommentCard
          key={p.id}
          title={p.title}
          content={p.content}
          authorName={p.author.name}
          updatedAt={p.updatedAt}
        />
      ))}
    </>
  )
}
