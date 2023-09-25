import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import React, { createContext, useEffect, useState } from 'react'
import { Resource } from '@prisma/client'

export const ResourceContext = createContext<Resource[] | null>(null)

const Home = () => {
  const MapWithNoSSR = dynamic(() => import('../features/map'), {
    ssr: false,
  })
  const [resources, setResources] = useState<Resource[]>()

  useEffect(() => {
    ;(async () => {
      try {
        const result = await fetch('/api/resources', { method: 'GET' })
        setResources(await result.json())
      } catch (e) {
        console.error(e)
      }
    })()
  }, [])

  return (
    // @ts-ignore is needed because type cannot recognise that props.resources already contains the relational object
    //@ts-ignore
    <>
      {resources && (
        <ResourceContext.Provider value={resources}>
          <div id="map">
            <MapWithNoSSR />
          </div>
        </ResourceContext.Provider>
      )}
    </>
  )
}

export default Home
