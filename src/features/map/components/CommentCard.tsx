import { format } from 'date-fns'
import { CommentCardProps } from '../types'
import { Text } from '@chakra-ui/react'

export const CommentCard = ({
  title,
  content,
  authorName,
  updatedAt,
}: CommentCardProps) => {
  return (
    <>
      <Text textStyle="body-2">{title}</Text>
      <Text textStyle="body-2">{content}</Text>
      <Text textStyle="body-2">author: {authorName}</Text>
      <Text textStyle="caption">
        created: {format(new Date(updatedAt), 'dd-MM-yyyy')}
      </Text>
    </>
  )
}
