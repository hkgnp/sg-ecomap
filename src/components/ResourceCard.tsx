import { useMap } from "react-leaflet";

export default function ResourceCard(props: any) {
  const map = useMap();

  function goToMarker() {
    map.flyTo([props.latitude, props.longitude], 16);
    props.setMarker([props.latitude, props.longitude]);
  }

  return (
    <button
      onClick={goToMarker}
      className="border border-blue-800 rounded-md p-3 text-xs hover:text-white hover:bg-blue-800"
    >
      <p>{props.org}</p>
      <div>
        <span className="rounded-full">{props.category}</span>
      </div>
      <p>{props.address}</p>
    </button>
  );
}
