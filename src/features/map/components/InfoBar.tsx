import {
  CloseButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from '@chakra-ui/react'
import { type InfoBarProps } from '~/features/map/types'
import { useContext, useState } from 'react'
import { ResourceContext } from '~/pages/map'
import { Tag } from '@opengovsg/design-system-react'
import { InfoBarDetails } from './InfoBarDetails'
import { Comments } from './Comments'

export const InfoBar = ({ isOpen, onClose, id }: InfoBarProps): JSX.Element => {
  const resources = useContext(ResourceContext)
  const [isPortrait, setIsPortrait] = useState<boolean>(
    screen.orientation.type === 'portrait-primary' ? true : false
  )

  screen.orientation.addEventListener('change', (event: Event) => {
    const type = (event.target as ScreenOrientation).type
    type === 'portrait-primary' ? setIsPortrait(true) : setIsPortrait(false)
  })

  const selectedResource = resources?.filter((r) => r.id === id)[0]
  if (!selectedResource) return <div></div>
  const { name, address, contactNumber, email, category, website, postalCode } =
    selectedResource

  return (
    <>
      {resources && selectedResource && (
        <Drawer
          placement={isPortrait ? 'bottom' : 'right'}
          isFullHeight={false}
          autoFocus={false}
          onClose={onClose}
          isOpen={isOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">
              <Flex justifyContent="space-between">
                <Text textStyle="responsive-heading.light">{name}</Text>
                <CloseButton onClick={onClose} />
              </Flex>
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
