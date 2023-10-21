import { Post, Resource } from "@prisma/client";
import { type LeafletMouseEventHandlerFn } from "leaflet";
import { MouseEventHandler, type Dispatch, type SetStateAction } from "react";
import { KeyedMutator } from "swr";

export type MarkerObjProps = {
  id: string;
  latitude: number;
  longitude: number;
  category: string;
};

export type ResourceLatLngProps = {
  id: string;
  latitude: number;
  longitude: number;
};

export type DrawerContextProps = {
  onOpen: LeafletMouseEventHandlerFn;
  setId: Dispatch<SetStateAction<string>>;
};

export type ResourceContextProps = [
  resourcesState: Resource[],
  setResourcesState: Dispatch<Resource[]>,
];

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
  inactive: boolean | null;
  resource: Resource;
  mutate: KeyedMutator<unknown>;
};

export type SearchFilterUtilsProps = {
  filterResources: (e: string) => Promise<void>;
  categories: string[];
};

export type DrawerHeaderDetailsProps = {
  name: string;
  category: string;
  inactive: boolean | null;
  onClose: MouseEventHandler;
};

export type WriteCommentsProps = {
  id: string;
  comments: Post[];
  mutate: KeyedMutator<unknown>;
};
