import { Marker, useMap } from 'react-leaflet'
import { type MarkerObjProps } from '~/features/map/types'
import { useContext } from 'react'
import { DrawerContext } from '~/features/map'
import { type LeafletMouseEvent } from 'leaflet'
import L from 'leaflet'

export const MarkerObj = ({
  id,
  longitude,
  latitude,
  category,
}: MarkerObjProps) => {
  const drawerProps = useContext(DrawerContext)
  const map = useMap()

  const handleMarkerClick = (e: LeafletMouseEvent) => {
    if (!drawerProps || !id || !latitude || !longitude) return
    map.setView([latitude, longitude])
    drawerProps.setId(id)
    drawerProps.onOpen(e)
  }

  return (
    <>
      {latitude && longitude && (
        <Marker
          position={[latitude, longitude]}
          eventHandlers={{
            click: handleMarkerClick,
          }}
        />
      )}
    </>
  )
}
