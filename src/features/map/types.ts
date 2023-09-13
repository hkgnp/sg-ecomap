import { Post, Prisma, Resource } from '@prisma/client'
import { type LatLngExpression, type LeafletMouseEventHandlerFn } from 'leaflet'
import { type Dispatch, type SetStateAction } from 'react'

export interface MarkerObjProps extends Resource {
  onOpen: LeafletMouseEventHandlerFn
  position: LatLngExpression
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

export type ResourceWithPosts = Prisma.ResourceGetPayload<{
  include: { posts: true }
}>

export type PostProps = {
  posts: Post[]
}
