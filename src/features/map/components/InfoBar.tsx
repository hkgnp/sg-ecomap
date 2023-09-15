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
          {/*Set maxH for DrawerContent so it doesn't take up the full height on a small screen when there is long content */}
          <DrawerContent maxH={isPortrait ? '80vh' : '100vh'}>
            <DrawerHeader borderBottomWidth="1px">
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
              <Tag variant="subtle" marginY="2">
                {category}
              </Tag>
              <InfoBarDetails
                address={address}
                postalCode={postalCode}
                website={website}
                contactNumber={contactNumber}
                email={email}
              />
            </DrawerHeader>
            <DrawerBody>
              <Comments id={id} />
            </DrawerBody>
            <Text>Report an error</Text>
          </DrawerContent>
        </Drawer>
      )}
    </>
  )
}
