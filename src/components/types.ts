import { Resource } from "@prisma/client";
import { type LeafletMouseEventHandlerFn } from "leaflet";
import { InferMutationResult } from "node_modules/@trpc/react-query/dist/utils/inferReactQueryProcedure";
import { MouseEventHandler, type Dispatch, type SetStateAction } from "react";

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
  handleInactive: () => void;
  inactive: boolean | null;
  resource: Resource;
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
  update: InferMutationResult<any>;
};
