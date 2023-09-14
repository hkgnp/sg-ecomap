import { Flex, Text } from '@chakra-ui/react'
import { BiGlobe, BiPhone, BiMailSend, BiMapPin } from 'react-icons/bi'
import { ResourceWithPosts } from '../types'

export const InfoBarDetails = ({
  id,
  address,
  postalCode,
  website,
  contactNumber,
  email,
}: Partial<ResourceWithPosts>) => {
  return (
    <>
      <Flex gap="2">
        <BiMapPin size="48px" />
        <Text textStyle="body-2" lineHeight="2" marginBottom="2">
          {address} S({postalCode})
        </Text>
      </Flex>

      <Flex gap="2">
        <BiMailSend size="24px" />
        <Text textStyle="body-2" noOfLines={1} lineHeight="2" marginBottom="2">
          google@google.com
        </Text>
      </Flex>

      <Flex gap="2">
        <BiPhone size="24px" />
        <Text textStyle="body-2" noOfLines={1} lineHeight="2" marginBottom="2">
          62341239 / 91234567
        </Text>
      </Flex>

      <Flex gap="2">
        <BiGlobe size="24px" />
        <Text textStyle="body-2" noOfLines={1} lineHeight="2" marginBottom="2">
          https://www.google.com
        </Text>
      </Flex>
    </>
  )
}
