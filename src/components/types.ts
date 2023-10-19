import { Post, Resource } from "@prisma/client";
import { type LeafletMouseEventHandlerFn } from "leaflet";
import { MouseEventHandler, type Dispatch, type SetStateAction } from "react";
import { KeyedMutator } from "swr";

export interface MarkerObjProps {
  id: string;
  latitude: number;
  longitude: number;
  category: string;
}

export type DrawerContextProps = {
  onOpen: LeafletMouseEventHandlerFn;
  setId: Dispatch<SetStateAction<string>>;
};

export type InfoBarProps = {
  isOpen: boolean;
  onClose: () => void;
  id: string;
};

export type ResourceProps = {
  resources: Resource[];
};

export type Props = {
  resources: Resource[];
};

export type PostProps = {
  id: string;
};

export type ResourceActionProps = {
  id: string;
  setIsEditing: Function;
};

export type SearchFilterUtilsProps = {
  filterResources: Function;
  categories: string[];
};

export type DrawerHeaderDetailsProps = {
  name: string;
  category: string;
  onClose: MouseEventHandler;
};

export type WriteCommentsProps = {
  id: string;
  comments: Post[];
  mutate: KeyedMutator<any>;
};
