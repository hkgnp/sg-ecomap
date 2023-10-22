import { createContext, useEffect, useState } from "react";
import { MarkerLayer } from "./markers/MarkerLayer";
import { DrawerContextProps } from "./types";
import { useDisclosure } from "@chakra-ui/react";
import { SearchFilterUtilities } from "./SearchFilterUtilities";
import { Resource } from "@prisma/client";
import { InfoBar } from "./infobar/InfoBar";
import { trpc } from "@/utils/trpc";

export const DrawerContext = createContext<DrawerContextProps | null>(null);

export const UtilityLayer = () => {
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  // For drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState<string>("");

  const res = trpc.resources.findAll.useQuery();
  const resources = res.data;

  useEffect(() => {
    if (resources) {
      setFilteredResources(resources);
      setCategories([
        ...new Set(resources.map((i: { category: string }) => i.category)),
      ] as string[]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resources]);

  const filterResources = async (e: string) => {
    const Fuse = (await import("fuse.js")).default;
    const fuse = new Fuse(resources!, {
      keys: ["name", "category", "address", "email", "website", "contact"],
      shouldSort: true,
      threshold: 0.25,
    });
    const results = fuse.search(e).map((r) => r.item) as Resource[];
    setFilteredResources(results);
  };

  return (
    <>
      <SearchFilterUtilities
        filterResources={filterResources}
        categories={categories}
      />
      {id && <InfoBar isOpen={isOpen} onClose={onClose} id={id} />}
      <DrawerContext.Provider value={{ onOpen, setId }}>
        {filteredResources && <MarkerLayer resources={filteredResources} />}
      </DrawerContext.Provider>
      )
    </>
  );
};
