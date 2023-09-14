import { useContext } from 'react'
import { ResourceContext } from '~/pages/map'
import { MarkerObj } from '~/features/map/components/MarkerObj'

export const MarkerLayer = () => {
  const resources = useContext(ResourceContext)

  return (
    <>
      {resources &&
        resources.map((r) => (
          <MarkerObj
            key={r.id}
            id={r.id}
            latitude={r.latitude}
            longitude={r.longitude}
          />
        ))}
    </>
  )
}
