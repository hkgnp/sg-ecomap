import dynamic from "next/dynamic";
import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { getResources } from "./api/resources";
import { createContext } from "react";
import { Resource } from "@prisma/client";

export const getStaticProps = (async () => {
  const resources = await getResources();
  return { props: { resources: resources } };
}) satisfies GetStaticProps<{
  resources: Partial<Resource>[];
}>;

export const ResourceContext = createContext<Partial<Resource>[] | null>(null);

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
