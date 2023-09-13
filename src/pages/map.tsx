import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import type { GetServerSideProps } from 'next'
import type { Resource } from '@prisma/client'
import { prisma } from '~/server/prisma'
import React, { createContext } from 'react'

export const getServerSideProps: GetServerSideProps = async () => {
  const resources = await prisma.resource.findMany({
    include: {
      posts: true,
    },
  })
  return {
    props: { resources: JSON.parse(JSON.stringify(resources)) },
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
