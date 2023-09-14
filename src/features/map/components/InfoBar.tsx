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
import { Tag } from '@opengovsg/design-system-react'
import { InfoBarDetails } from './InfoBarDetails'
import { Comments } from './Comments'

export const InfoBar = ({ isOpen, onClose, id }: InfoBarProps): JSX.Element => {
  const resources = useContext(ResourceContext)
  const selectedResource = resources?.filter((r) => r.id === id)[0]
  if (!selectedResource) return <div></div>
  const { name, address, contactNumber, email, category, website, postalCode } =
    selectedResource

  return (
    <>
      {resources && selectedResource && (
        <Drawer
          placement={'right'}
          onClose={onClose}
          isOpen={isOpen}
          autoFocus={false}
        >
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
              <Comments id={id} />
            </DrawerBody>
            <Text>Report an error</Text>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
