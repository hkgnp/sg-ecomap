import { type LatLngExpression, type LeafletMouseEventHandlerFn } from 'leaflet'
import { type Dispatch, type SetStateAction } from 'react'

export type MarkerObjProps = {
  address: string
  contactNumber: string
  id: string
  name: string
  onOpen: LeafletMouseEventHandlerFn
  position: LatLngExpression
  postalCode: string
  website: string
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
