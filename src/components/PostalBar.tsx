import { useState } from "react";
import { getAddress } from "../services/getAddress";
import { Marker, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { postalIcon } from "./Icons";

export default function PostalBar() {
  const [postal, setPostal] = useState("");
  const [latlng, setLatLng] = useState<LatLngExpression>();
  const map = useMap();

  async function goToPostalMarker(e: any) {
    e.preventDefault();
    const response = await getAddress(postal);
    setLatLng([response.LATITUDE, response.LONGITUDE]);
    map.flyTo([response.LATITUDE, response.LONGITUDE], 16);
  }

  return (
    <div
      style={{ zIndex: 401 }}
      className="bg-white duration-500 w-72 absolute p-3 box-border shadow-lg shadow-black top-0 right-0 opacity-95 text-black rounded-bl-md"
    >
      <form onSubmit={goToPostalMarker} className="flex flex-row">
        <input
          className="px-2 py-1 border border-gray-400 w-full rounded-l-md focus:outline-none"
          onChange={(e) => setPostal(e.target.value)}
          value={postal}
          placeholder="Enter a postal code"
          maxLength={6}
          autoFocus
        />
        <button
          type="submit"
          className="bg-blue-600 px-3 rounded-r-md text-white font-bold border-2 border-blue-600"
        >
          Submit
        </button>
      </form>
      {latlng && (
        <span className="hue-rotate-90">
          <Marker position={latlng} icon={postalIcon} />
        </span>
      )}
    </div>
  );
}
