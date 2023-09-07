import { LatLngExpression } from "leaflet";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
const Toolbar = lazy(() => import("./Toolbar"));
import allResources from "../assets/community_list_cleaned.json";
const PostalBar = lazy(() => import("./PostalBar"));

export default function Map() {
  const singapore: LatLngExpression = [1.3521, 103.8198];
  const resources = useRef(allResources);
  const [marker, setMarker] = useState();
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Credits: https://stackoverflow.com/a/35092559
    const uniqueCat = [
      ...new Set(resources.current.map((item) => item.category)),
    ];
    setCategories((currArr) => [...currArr, ...uniqueCat]);
  }, [allResources]);

  return (
    <MapContainer
      center={singapore}
      zoom={12}
      scrollWheelZoom={false}
      className="absolute inset-0 overflow-y-hidden"
    >
      <Suspense fallback={<p>Loading...</p>}>
        <PostalBar />
        <Toolbar
          categories={categories}
          resources={resources.current}
          setMarker={setMarker}
        />
      </Suspense>
      <TileLayer
        url={import.meta.env.VITE_URL as string}
        attribution="This is made possible due to Bing Maps. No monetary gains are inherited from this web app."
      />
      {marker && <Marker position={marker}></Marker>}
    </MapContainer>
  );
}
