import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import type { LatLngExpression } from "leaflet";
import { UtilityLayer } from "./UtilityLayer";
import MarkerClusterGroup from "@/libs/cluster";

const Index = () => {
  const singapore: LatLngExpression = [1.3521, 103.8198];

  return (
    <MapContainer
      zoomControl={false}
      center={singapore}
      zoom={13}
      scrollWheelZoom={false}
      style={{ position: "fixed", height: "100vh", width: "100%" }}
    >
      <ZoomControl position="bottomright" />
      <TileLayer
        url={"https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png"}
        attribution={
          '<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>'
        }
      />
      <MarkerClusterGroup>
        <UtilityLayer />
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Index;
