import "leaflet/dist/leaflet.css";
import React from "react";
import dynamic from "next/dynamic";

const Map = () => {
  const Map = dynamic(() => import("../features/map"), { ssr: false });

  return (
    <div id="map">
      <Map />
    </div>
  );
};

export default Map;
