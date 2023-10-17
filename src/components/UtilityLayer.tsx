import { createContext, useEffect, useState } from "react";
import { MarkerLayer } from "./markers/MarkerLayer";
import { DrawerContextProps } from "./types";
import { useDisclosure } from "@chakra-ui/react";
import { SearchFilterUtilities } from "./SearchFilterUtilities";
import { Resource } from "@prisma/client";
import { InfoBar } from "./infobar/InfoBar";
import useSWR from "swr";

export const DrawerContext = createContext<DrawerContextProps | null>(null);
export const ResourceContext = createContext<Resource[] | null>(null);

// @ts-ignore
const fetcher = (...args) => fetch(...args).then((res) => res.json());
const useResources = () => {
  const { data, error, isLoading } = useSWR(`/api/resources`, fetcher);
  return {
    resources: data as Resource[],
    isLoading,
    isError: error,
  };
};

const UtilityLayer = () => {
  const [filteredResources, setFilteredResources] = useState<Resource[]>();
  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");

  const { resources, isLoading, isError } = useResources();

  const categories = [
    ...new Set(resources.map((i: { category: string }) => i.category)),
  ];

  const filterResources = async (e: string) => {
    setFilteredResources(
      resources.filter(
        (r) =>
          r.name.toLowerCase().includes(e.toLowerCase()) ||
          r.category.toLowerCase().includes(e.toLowerCase()) ||
          r.address.toLowerCase().includes(e.toLowerCase()) ||
          r.postalCode === e,
      ),
    );
  };

  return (
    <ResourceContext.Provider value={resources}>
      <SearchFilterUtilities
        filterResources={filterResources}
        categories={categories}
      />
      <InfoBar isOpen={isOpen} onClose={onClose} id={id} />
      {!isLoading && (
        <DrawerContext.Provider value={{ onOpen, setId }}>
          {filteredResources && <MarkerLayer resources={filteredResources} />}
        </DrawerContext.Provider>
      )}
    </ResourceContext.Provider>
  );
};

export default UtilityLayer;
