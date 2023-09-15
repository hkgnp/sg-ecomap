import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import type { LatLngExpression } from 'leaflet'
import { MarkerLayer } from '~/features/map/components/MarkerLayer'
import { useDisclosure } from '@chakra-ui/react'
import { createContext, useContext, useEffect, useState } from 'react'
import { type DrawerContextProps } from '~/features/map/types'
import { InfoBar } from '~/features/map/components/InfoBar'
import { Input } from '@opengovsg/design-system-react'
import { ResourceContext } from '~/pages/map'

export const DrawerContext = createContext<DrawerContextProps | null>(null)

const Index = () => {
  const resources = useContext(ResourceContext)
  if (!resources) return

  const singapore: LatLngExpression = [1.3521, 103.8198]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState<string>('')

  return (
    <>
      <Input
        placeholder="Start searching"
        size="xs"
        width="305px"
        rounded="2xl"
        position="absolute"
        top="3"
        left="2"
        zIndex={99999}
      />
      <InfoBar isOpen={isOpen} onClose={onClose} id={id} />
      <MapContainer
        zoomControl={false}
        center={singapore}
        zoom={13}
        scrollWheelZoom={false}
        style={{ position: 'fixed', height: '100vh', width: '100%' }}
      >
        <ZoomControl position="bottomleft" />
        <TileLayer
          url={'https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png'}
          attribution={
            '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;" alt="Attribution"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
          }
        />
        <DrawerContext.Provider value={{ onOpen, setId }}>
          <MarkerLayer resources={resources} />
        </DrawerContext.Provider>
      </MapContainer>
    </>
  )
}

export default Index
