import { MarkerObj } from '~/features/map/components/MarkerObj'
import { ResourceProps } from '../types'

export const MarkerLayer = (resources: ResourceProps) => {
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
