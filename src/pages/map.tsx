import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import type { GetServerSideProps } from 'next'
import { prisma } from '~/server/prisma'
import React, { createContext } from 'react'
import { Props } from '~/features/map/types'
import { Resource } from '@prisma/client'

export const getServerSideProps: GetServerSideProps = async () => {
  const resources = await prisma.resource.findMany()
  return {
    props: { resources: JSON.parse(JSON.stringify(resources)) },
  }
}

export const ResourceContext = createContext<Resource[] | null>(null)

const Home: React.FC<Props> = (props) => {
  const MapWithNoSSR = dynamic(() => import('../features/map'), {
    ssr: false,
  })
  return (
    // @ts-ignore is needed because type cannot recognise that props.resources already contains the relational object
    //@ts-ignore
    <ResourceContext.Provider value={props.resources}>
      <div id="map">
        <MapWithNoSSR />
      </div>
    </ResourceContext.Provider>
  )
}

export default Home
