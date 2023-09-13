import { Marker, useMap } from 'react-leaflet'
import { type MarkerObjProps } from '~/features/map/types'
import { useContext } from 'react'
import { DrawerContext } from '~/features/map'
import { type LeafletMouseEvent } from 'leaflet'

export const MarkerObj = ({ id, position }: Partial<MarkerObjProps>) => {
  const drawerProps = useContext(DrawerContext)
  const map = useMap()

  const handleMarkerClick = (e: LeafletMouseEvent) => {
    if (!drawerProps || !id || !position) return
    map.setView(position)
    drawerProps.onOpen(e)
    drawerProps.setId(id)
  }

  return (
    <>
      {position && (
        <Marker
          position={position}
          eventHandlers={{
            click: handleMarkerClick,
          }}
        />
      )}
    </>
  )
}
