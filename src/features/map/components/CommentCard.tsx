import { format } from 'date-fns'
import { CommentCardProps } from '../types'
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react'
import { RxAvatar } from 'react-icons/rx'

export const CommentCard = ({
  title,
  content,
  authorName,
  updatedAt,
}: CommentCardProps) => {
  return (
    <>
      <Card marginBottom="4">
        <CardBody>
          <Heading size="xs" textTransform="uppercase" marginBottom="2">
            {title}
          </Heading>
          <Stack divider={<StackDivider />} spacing="3">
            <Box>
              <Text textStyle="body-2">{content}</Text>
            </Box>
            <Flex flexDirection="row" justifyContent="space-between">
              <Text textStyle="caption-1" display="flex" gap="1">
                <RxAvatar size="14" /> {authorName}
              </Text>
              <Text textStyle="caption-1">
                {format(new Date(updatedAt), 'dd-MM-yyyy')}
              </Text>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </>
  )
}
