import { Text } from '@chakra-ui/react'
import { Textarea } from '@opengovsg/design-system-react'
import { format } from 'date-fns'
import { PostProps } from '../types'

export const Comments = ({ posts }: PostProps) => {
  return (
    <>
      <Text textStyle="h6" marginTop="5">
        Comments
      </Text>
      <Textarea size="xs" isSuccess={false} />
      {posts.map((p) => (
        <>
          <Text textStyle="body-2">{p.title}</Text>
          <Text textStyle="body-2">{p.content}</Text>
          <Text textStyle="body-2">author: {p.author.name}</Text>
          <Text textStyle="caption">
            created: {format(new Date(p.updatedAt), 'dd-MM-yyyy')}
          </Text>
        </>
      ))}
    </>
  )
}
