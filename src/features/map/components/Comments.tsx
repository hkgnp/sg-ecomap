import { Text } from '@chakra-ui/react'
import { prisma } from '~/server/prisma'

export const Comments = () => {
  return (
    <>
      <Text textStyle="h6" marginTop="5">
        Comments
      </Text>
      <Text textStyle="body-2">This resource is awesome</Text>
    </>
  )
}
