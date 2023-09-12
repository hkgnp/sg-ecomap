import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { type InfoBarProps } from '~/features/map/types'
import { useContext } from 'react'
import { ResourceContext } from '~/pages/map'
import { findResource } from '~/features/map/utils/find-resource'

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
          <DrawerHeader borderBottomWidth="1px">{name}</DrawerHeader>
          <DrawerBody>
            <p>{category}</p>
            <p>
              {address} S({postalCode})
            </p>
            <p>{website}</p>
            <p>{contactNumber}</p>
            <p>{email}</p>
            <h1>Comments</h1>
          </DrawerBody>
          <p>Report an error</p>
        </DrawerContent>
      </Drawer>
    )
  } else {
    return <div></div>
  }
}
