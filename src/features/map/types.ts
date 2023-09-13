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
  include: { posts: { include: { author: true } } }
}>

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true }
}>

export type PostProps = {
  posts: PostWithAuthor[]
}
