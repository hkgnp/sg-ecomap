import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import type { GetServerSideProps } from 'next'
import { prisma } from '~/server/prisma'
import React, { createContext } from 'react'
import { Props, ResourceWithPosts } from '~/features/map/types'

export const getServerSideProps: GetServerSideProps = async () => {
  const resources = await prisma.resource.findMany({
    include: {
      posts: {
        include: {
          author: true,
        },
      },
    },
  })
  return {
    props: { resources: JSON.parse(JSON.stringify(resources)) },
  }
}

export const ResourceContext = createContext<ResourceWithPosts[] | null>(null)

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
