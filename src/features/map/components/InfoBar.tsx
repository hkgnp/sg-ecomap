import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { type InfoBarProps } from '~/features/map/types'
import { useContext } from 'react'
import { ResourceContext } from '~/pages/map'
import { findResource } from '~/features/map/utils/find-resource'
import { SlLocationPin, SlPhone } from 'react-icons/sl'
import { CgWebsite } from 'react-icons/cg'
import { MdEmail } from 'react-icons/md'

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

    return (
      <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Text textStyle="responsive-heading.light">{name}</Text>
            <Text textStyle="subhead-1">{category}</Text>
          </DrawerHeader>
          <DrawerBody>
            <Text
              textStyle="body-2"
              noOfLines={1}
              lineHeight="2"
              marginBottom="2"
            >
              <SlLocationPin /> {address} S({postalCode})
            </Text>
            <Text
              textStyle="body-2"
              noOfLines={1}
              lineHeight="2"
              marginBottom="2"
            >
              <MdEmail /> google@google.com
            </Text>
            <Text
              textStyle="body-2"
              noOfLines={1}
              lineHeight="2"
              marginBottom="2"
            >
              <SlPhone /> 62341239 / 91234567
            </Text>
            <Text
              textStyle="body-2"
              noOfLines={1}
              lineHeight="2"
              marginBottom="2"
            >
              <CgWebsite /> https://www.google.com
            </Text>
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
