import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from '@chakra-ui/react'
import { ResourceWithPosts, type InfoBarProps } from '~/features/map/types'
import { useContext } from 'react'
import { ResourceContext } from '~/pages/map'
import { findResource } from '~/features/map/utils/find-resource'
import { Tag } from '@opengovsg/design-system-react'
import { InfoBarDetails } from './InfoBarDetails'
import { Comments } from './Comments'

export const InfoBar = ({ isOpen, onClose, id }: InfoBarProps) => {
  const resources = useContext(ResourceContext)
  const selectedResource: ResourceWithPosts = findResource(resources, id)

  if (selectedResource) {
    const {
      name,
      address,
      contactNumber,
      email,
      category,
      website,
      postalCode,
      posts,
    } = selectedResource

    return (
      <Drawer placement={'right'} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            <Text textStyle="responsive-heading.light">{name}</Text>
            <Tag variant="subtle" marginTop="2">
              {category}
            </Tag>
          </DrawerHeader>
          <DrawerBody>
            <InfoBarDetails
              address={address}
              postalCode={postalCode}
              website={website}
              contactNumber={contactNumber}
              email={email}
            />
            <Comments posts={posts} />
          </DrawerBody>
          <p>Report an error</p>
        </DrawerContent>
      </Drawer>
    )
  } else {
    return <div></div>
  }
}
