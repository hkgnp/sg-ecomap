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

export type ResourceProps = {
  resources: Resource[]
}

export type Props = {
  resources: Resource[]
}

export type PostWithAuthor = Prisma.PostGetPayload<{
  include: { author: true }
}>

export type PostProps = {
  id: string
}

export type CommentCardProps = {
  title: string | null
  content: string
  authorName: string | null
  updatedAt: Date
}
