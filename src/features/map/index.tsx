import { MapContainer, TileLayer, useMap, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import type { LatLngExpression } from 'leaflet'
import { MarkerLayer } from '~/features/map/components/MarkerLayer'
import { useDisclosure } from '@chakra-ui/react'
import { createContext, useContext, useState } from 'react'
import { type DrawerContextProps } from '~/features/map/types'
import { InfoBar } from '~/features/map/components/InfoBar'
import { ResourceContext } from '~/pages/map'
import { SearchFilterUtilities } from './components/SearchFilterUtilities'

export const DrawerContext = createContext<DrawerContextProps | null>(null)

const Index = () => {
  const resources = useContext(ResourceContext)
  // Get unique categories
  const categories = [...new Set(resources?.map((i) => i.category))]
  const singapore: LatLngExpression = [1.3521, 103.8198]

  const [filteredResources, setFilteredResources] = useState(resources)

  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [id, setId] = useState<string>('')

  const filterResources = async (e: string) => {
    if (!resources) return
    setFilteredResources(
      resources.filter(
        (r) =>
          r.name.toLowerCase().includes(e.toLowerCase()) ||
          r.category.toLowerCase().includes(e.toLowerCase()) ||
          r.address.toLowerCase().includes(e.toLowerCase()) ||
          r.postalCode === e
      )
    )
  }

  return (
    <>
      <SearchFilterUtilities
        filterResources={filterResources}
        categories={categories}
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
          {filteredResources && <MarkerLayer resources={filteredResources} />}
        </DrawerContext.Provider>
      </MapContainer>
    </>
  )
}

export default Index
