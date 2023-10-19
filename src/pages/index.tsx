import dynamic from "next/dynamic";
import { Resource } from "@prisma/client";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { getResources } from "./api/resources";
import { createContext } from "react";

export const getStaticProps = (async () => {
  const resources = await getResources();
  return { props: { resources } };
}) satisfies GetStaticProps<{
  resources: Resource[];
}>;

export const ResourceContext = createContext<Resource[] | null>(null);

const Home = ({
  resources,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });

  return (
    <div id="map">
      <ResourceContext.Provider value={resources}>
        <MapWithNoSSR />
      </ResourceContext.Provider>
    </div>
  );
};

export default Home;
