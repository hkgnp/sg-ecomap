import { MarkerObj } from "./MarkerObj";
import { ResourceProps } from "../types";
import MarkerClusterGroup from "@/libs/cluster";

export const MarkerLayer = ({ resources }: ResourceProps) => {
  return (
    <>
      <MarkerClusterGroup>
        {resources &&
          resources.map((r) => (
            <MarkerObj
              key={r.id}
              id={r.id}
              latitude={r.latitude}
              longitude={r.longitude}
              category={r.category}
            />
          ))}
      </MarkerClusterGroup>
    </>
  );
};
