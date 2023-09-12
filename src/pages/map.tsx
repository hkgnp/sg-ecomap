import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import type { GetStaticProps } from 'next'
import type { Resource } from '@prisma/client'
import { prisma } from '~/server/prisma'
import React, { createContext } from 'react'

export const getStaticProps: GetStaticProps = async () => {
  const resources = await prisma.resource.findMany()
  return {
    props: { resources },
    revalidate: 10,
  }
}

type Props = {
  resources: Resource[]
}

export const ResourceContext = createContext<Resource[] | null>(null)
const Home: React.FC<Props> = (props) => {
  const MapWithNoSSR = dynamic(() => import('../features/map'), {
    ssr: false,
  })

  return (
    <ResourceContext.Provider value={props.resources}>
      <div id="map">
        <MapWithNoSSR />
      </div>
    </ResourceContext.Provider>
  )
}

export default Home
