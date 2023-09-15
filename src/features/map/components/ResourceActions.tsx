import { Flex } from '@chakra-ui/react'
import { Tag } from '@opengovsg/design-system-react'
import { ResourceActionProps } from '../types'

export const ResourceActions = ({ id }: ResourceActionProps) => {
  return (
    <Flex direction="row" marginTop="4" gap="3">
      <Tag size="sm" cursor="pointer" colorScheme="main">
        Edit
      </Tag>
      <Tag size="sm" cursor="pointer" colorScheme="critical">
        Delete
      </Tag>
    </Flex>
  )
}
