import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react'
import { type InfoBarProps } from '~/features/map/types'
import { useContext } from 'react'
import { ResourceContext } from '~/pages/map'
import { findResource } from '~/features/map/utils/find-resource'
import { useSwipeable } from 'react-swipeable'
import { BiGlobe, BiPhone, BiMailSend, BiMapPin } from 'react-icons/bi'
import { Tag } from '@opengovsg/design-system-react'

export const InfoBar = ({ isOpen, onClose, id }: InfoBarProps) => {
  const resources = useContext(ResourceContext)
  const selectedResource = findResource(resources, id)

  if (selectedResource) {
    const {
      name,
      address,
      contactNumber,
      latitude,
      email,
      category,
      website,
      longitude,
      postalCode,
    } = selectedResource

    // Swipe to hide
    const handlers = useSwipeable({
      onSwipedRight: () => onClose(),
    })

    return (
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent {...handlers}>
          <DrawerHeader borderBottomWidth="1px">
            <Text textStyle="responsive-heading.light">{name}</Text>
            <Tag variant="subtle" marginTop="2">
              {category}
            </Tag>
          </DrawerHeader>
          <DrawerBody>
            <Flex gap="2">
              <BiMapPin size="48px" />
              <Text textStyle="body-2" lineHeight="2" marginBottom="2">
                {address} S({postalCode})
              </Text>
            </Flex>

            <Flex gap="2">
              <BiMailSend size="24px" />
              <Text
                textStyle="body-2"
                noOfLines={1}
                lineHeight="2"
                marginBottom="2"
              >
                google@google.com
              </Text>
            </Flex>

            <Flex gap="2">
              <BiPhone size="23px" />
              <Text
                textStyle="body-2"
                noOfLines={1}
                lineHeight="2"
                marginBottom="2"
              >
                62341239 / 91234567
              </Text>
            </Flex>

            <Flex gap="2">
              <BiGlobe size="24px" />
              <Text
                textStyle="body-2"
                noOfLines={1}
                lineHeight="2"
                marginBottom="2"
              >
                https://www.google.com
              </Text>
            </Flex>
            <Text textStyle="h6" marginTop="10">
              Comments
            </Text>
            <Text textStyle="body-2">This resource is awesome</Text>
          </DrawerBody>
          <p>Report an error</p>
        </DrawerContent>
      </Drawer>
    )
  } else {
    return <div></div>
  }
}
