import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/react'
import { type InfoBarProps } from '~/features/map/types'
import { useContext, useState } from 'react'
import { ResourceContext } from '~/pages/map'
import { Button, Tag } from '@opengovsg/design-system-react'
import { InfoBarDetails } from './InfoBarDetails'
import { Comments } from './Comments'
import { ResourceActions } from './ResourceActions'
import { DrawerHeaderDetails } from './DrawerHeaderDetails'

export const InfoBar = ({ isOpen, onClose, id }: InfoBarProps): JSX.Element => {
  const resources = useContext(ResourceContext)
  const [isEditing, setIsEditing] = useState(false)

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
          {/*Set maxH for DrawerContent so it doesn't take up the full height on a small screen when there is long content */}
          <DrawerContent
            maxH={isPortrait ? '80vh' : '100vh'}
            h={isPortrait ? '80vh' : '100vh'}
          >
            <DrawerHeader borderBottomWidth="1px">
              <DrawerHeaderDetails
                name={name}
                category={category}
                onClose={onClose}
              />
              {!isEditing && (
                <>
                  <InfoBarDetails
                    address={address}
                    postalCode={postalCode}
                    website={website}
                    contactNumber={contactNumber}
                    email={email}
                  />
                  <ResourceActions id={id} setIsEditing={setIsEditing} />
                </>
              )}
              {isEditing && (
                <Box>
                  <Button onClick={() => setIsEditing(false)}>Done</Button>
                </Box>
              )}
            </DrawerHeader>
            <DrawerBody>
              <Comments id={id} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
