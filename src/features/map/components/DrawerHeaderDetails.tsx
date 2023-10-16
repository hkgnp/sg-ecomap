import { CloseButton, Flex, Text } from '@chakra-ui/react'
import { Tag } from '@opengovsg/design-system-react'
import { DrawerHeaderDetailsProps } from '../types'

export const DrawerHeaderDetails = ({
  name,
  category,
  onClose,
}: DrawerHeaderDetailsProps) => {
  return (
    <>
      <Flex justifyContent="space-between">
        <Text
          textStyle="responsive-heading.light"
          fontSize="2xl"
          lineHeight="1.2"
        >
          {name}
        </Text>
        <CloseButton
          onClick={onClose}
          size="md"
          marginTop="-3"
          marginRight="-4"
        />
      </Flex>
      <Tag variant="solid" marginY="2" colorScheme="success">
        {category}
      </Tag>
    </>
  )
}
