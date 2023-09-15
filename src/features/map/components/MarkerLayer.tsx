import { Resource } from '@prisma/client'
import { MarkerObj } from '~/features/map/components/MarkerObj'

export const MarkerLayer = (resources: Resource[]) => {
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
