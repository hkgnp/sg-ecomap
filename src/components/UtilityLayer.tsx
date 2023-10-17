import { createContext, useEffect, useState } from "react";
import { MarkerLayer } from "./markers/MarkerLayer";
import { DrawerContextProps } from "./types";
import { useDisclosure } from "@chakra-ui/react";
import { SearchFilterUtilities } from "./SearchFilterUtilities";
import { Resource } from "@prisma/client";
import { InfoBar } from "./infobar/InfoBar";

export const DrawerContext = createContext<DrawerContextProps | null>(null);
export const ResourceContext = createContext<Resource[] | null>(null);

const UtilityLayer = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>();
  const [categories, setCategories] = useState<string[]>([]);

  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/resources");
      const resources = await res.json();
      if (!resources) return null;
      setResources(resources);

      const categories = [
        ...new Set(resources.map((i: { category: string }) => i.category)),
      ];
      setCategories(categories as string[]);
    })();
  }, []);

  useEffect(() => {
    setFilteredResources(resources);
  }, [resources]);

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
      <DrawerContext.Provider value={{ onOpen, setId }}>
        {filteredResources && <MarkerLayer resources={filteredResources} />}
      </DrawerContext.Provider>
    </ResourceContext.Provider>
  );
};

export default UtilityLayer;
