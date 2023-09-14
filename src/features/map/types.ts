import { Prisma, Resource } from '@prisma/client'
import { type LeafletMouseEventHandlerFn } from 'leaflet'
import { type Dispatch, type SetStateAction } from 'react'

export interface MarkerObjProps {
  id: string
  latitude: number
  longitude: number
}

export type DrawerContextProps = {
  onOpen: LeafletMouseEventHandlerFn
  setId: Dispatch<SetStateAction<string>>
}

export type InfoBarProps = {
  isOpen: boolean
  onClose: () => void
  id: string
}

export type Props = {
  resources: Resource[]
}

export type ResourceWithPosts = Prisma.ResourceGetPayload<{
  include: { posts: { include: { author: true } } }
}>

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true }
}>

export type PostProps = {
  posts: PostWithAuthor[]
}
