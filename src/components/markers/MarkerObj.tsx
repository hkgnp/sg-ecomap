import { Marker, useMap } from "react-leaflet";
import { MarkerObjProps } from "../types";
import { useContext } from "react";
import { type LeafletMouseEvent } from "leaflet";
import { DrawerContext } from "../UtilityLayer";

export const MarkerObj = ({ id, longitude, latitude }: MarkerObjProps) => {
  const drawerProps = useContext(DrawerContext);
  const map = useMap();

  const handleMarkerClick = (e: LeafletMouseEvent) => {
    if (!drawerProps || !id || !latitude || !longitude) return;
    map.setView([latitude, longitude]);
    drawerProps.setId(id);
    drawerProps.onOpen(e);
  };

  return (
    <>
      {latitude && longitude && (
        <Marker
          eventHandlers={{
            click: handleMarkerClick,
          }}
          position={[latitude, longitude]}
        />
      )}
    </>
  );
};
