import { createContext, useContext, useEffect, useState } from "react";
import { MarkerLayer } from "./markers/MarkerLayer";
import { DrawerContextProps } from "./types";
import { Alert, useDisclosure } from "@chakra-ui/react";
import { SearchFilterUtilities } from "./SearchFilterUtilities";
import { Resource } from "@prisma/client";
import { InfoBar } from "./infobar/InfoBar";
import useSWR from "swr";
import { Spinner } from "@opengovsg/design-system-react";
import { ResourceContext } from "../pages";

export const DrawerContext = createContext<DrawerContextProps | null>(null);
//export const ResourceContext = createContext<Resource[] | null>(null);

const UtilityLayer = () => {
  const [filteredResources, setFilteredResources] = useState<Resource[]>();
  const [categories, setCategories] = useState<string[]>([]);
  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  // @ts-ignore
  // const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const useResources = () => {
  //   const { data, error, isLoading } = useSWR(`/api/resources`, fetcher);
  //   return {
  //     resources: data as Resource[],
  //     isLoading,
  //     isError: error,
  //   };
  // };
  //
  // const { resources, isLoading, isError } = useResources();

  const resources = useContext(ResourceContext);

  useEffect(() => {
    if (!isLoading) {
      if (!resources) return;
      setFilteredResources(resources);
      setCategories([
        ...new Set(resources.map((i: { category: string }) => i.category)),
      ]);
    }
  }, [resources]);

  const filterResources = async (e: string) => {
    setFilteredResources(
      resources?.filter(
        (r) =>
          r.name.toLowerCase().includes(e.toLowerCase()) ||
          r.category.toLowerCase().includes(e.toLowerCase()) ||
          r.address.toLowerCase().includes(e.toLowerCase()) ||
          r.postalCode === e,
      ),
    );
  };

  return (
    <>
      {isLoading && (
        <Alert status="info" zIndex={999999}>
          <Spinner mr="1" />
          Loading Resources...
        </Alert>
      )}
      <SearchFilterUtilities
        filterResources={filterResources}
        categories={categories}
      />
      <InfoBar isOpen={isOpen} onClose={onClose} id={id} />
      <DrawerContext.Provider value={{ onOpen, setId }}>
        {filteredResources && <MarkerLayer resources={filteredResources} />}
      </DrawerContext.Provider>
      )
    </>
  );
};

export default UtilityLayer;
