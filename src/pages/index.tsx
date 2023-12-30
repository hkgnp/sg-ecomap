import dynamic from "next/dynamic";
import { createContext } from "react";
import { Resource } from "@prisma/client";
import { trpc } from "@/utils/trpc";

export const ResourceContext = createContext<Partial<Resource>[] | null>(null);

const Home = () => {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });

  const response = trpc.resources.findAll.useQuery();
  if (!response.data) return null;
  const resources = response.data;

  return (
    <div id="map">
      <ResourceContext.Provider value={resources}>
        <MapWithNoSSR />
      </ResourceContext.Provider>
    </div>
  );
};

export default Home;
