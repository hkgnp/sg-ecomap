import { createContext, useContext, useEffect, useState } from "react";
import { MarkerLayer } from "./markers/MarkerLayer";
import { DrawerContextProps } from "./types";
import { useDisclosure } from "@chakra-ui/react";
import { SearchFilterUtilities } from "./SearchFilterUtilities";
import { Resource } from "@prisma/client";
import { InfoBar } from "./infobar/InfoBar";
import { ResourceContext } from "../pages";

export const DrawerContext = createContext<DrawerContextProps | null>(null);

const UtilityLayer = () => {
  const [filteredResources, setFilteredResources] = useState<Resource[]>();
  const [categories, setCategories] = useState<string[]>([]);
  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");

  const resources = useContext(ResourceContext);

  useEffect(() => {
    if (!resources) return;
    setFilteredResources(resources);
    setCategories([
      ...new Set(resources.map((i: { category: string }) => i.category)),
    ]);
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
