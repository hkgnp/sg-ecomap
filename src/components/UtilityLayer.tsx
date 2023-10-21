import { createContext, useEffect, useState } from "react";
import { MarkerLayer } from "./markers/MarkerLayer";
import { DrawerContextProps } from "./types";
import { useDisclosure } from "@chakra-ui/react";
import { SearchFilterUtilities } from "./SearchFilterUtilities";
import { Resource } from "@prisma/client";
import { InfoBar } from "./infobar/InfoBar";
import useSWR from "swr";

export const DrawerContext = createContext<DrawerContextProps | null>(null);

const UtilityLayer = () => {
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const useResource = () => {
    const { data, error, isLoading } = useSWR(`/api/resources`, fetcher);
    return {
      resources: data,
      isLoading,
      isError: error,
    };
  };
  const { resources, isLoading } = useResource();

  useEffect(() => {
    if (!isLoading) {
      setFilteredResources(resources);
      setCategories([
        ...new Set(resources.map((i: { category: string }) => i.category)),
      ] as string[]);
    }
  }, []);

  const filterResources = async (e: string) => {
    const Fuse = (await import("fuse.js")).default;
    const fuse = new Fuse(resources, {
      keys: ["name", "category", "address", "email", "website", "contact"],
      shouldSort: true,
      threshold: 0.4,
    });
    const results = fuse.search(e).map((r) => r.item) as Resource[];
    setFilteredResources(results);
  };

  return (
    <>
      {!isLoading && (
        <SearchFilterUtilities
          filterResources={filterResources}
          categories={categories}
        />
      )}
      <InfoBar isOpen={isOpen} onClose={onClose} id={id} />
      <DrawerContext.Provider value={{ onOpen, setId }}>
        {filteredResources && <MarkerLayer resources={filteredResources} />}
      </DrawerContext.Provider>
      )
    </>
  );
};

export default UtilityLayer;
