import { useState, useEffect } from "react";
import { Resource } from "../resource";
import uniqueIdentifier from "../services/generateUniqueId";
import ResourceCard from "./ResourceCard";
import { IconArrowDown, IconArrowUp } from "./Icons";
import { Marker, Popup, useMap } from "react-leaflet";
import { DebounceInput } from "react-debounce-input";

export default function Toolbar(props: {
  categories: string[];
  resources: Resource[];
  setMarker: Function;
}) {
  const [resources, setResources] = useState<Resource[]>(props.resources);
  const [toolBar, openToolBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const map = useMap();

  useEffect(() => {
    if (!selectedCategory) {
      return;
    } else if (selectedCategory === "All Services") {
      setResources(props.resources);
    } else {
      setResources(
        props.resources.filter((i) => i.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  function filterResources(e: any) {
    setResources(
      props.resources.filter(
        (r) =>
          r.org.toLowerCase().includes(e.toLowerCase()) ||
          r.category.toLowerCase().includes(e.toLowerCase())
      )
    );
  }

  function toggleSideBar() {
    if (toolBar) {
      openToolBar(false);
      map.dragging.enable();
      window.scrollTo({ top: 0 });
    } else {
      openToolBar(true);
      map.dragging.disable();
    }
  }

  function filterCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedCategory(e.target.value);
  }

  return (
    <div
      className={`fixed bg-white z-high duration-500 xs:w-screen sm:w-screen lg:w-1/2 h-60 p-3 box-border shadow-lg shadow-black ${
        toolBar ? "bottom-0 opacity-95" : "-bottom-60"
      }`}
    >
      <div
        onClick={toggleSideBar}
        className="font-bold h-6 px-3 bg-white absolute border-gray-800 cursor-pointer rounded-t -top-5 left-6 flex justify-center align-middle"
      >
        <span className="">{toolBar ? <IconArrowDown /> : "More Options"}</span>
      </div>

      <div className="max-h-90 bg-white overflow-scroll">
        {resources.map((r: Resource) => (
          <Marker key={uniqueIdentifier()} position={[r.latitude, r.longitude]}>
            <Popup>
              <p>
                {r.org} ({r.category})
              </p>
              <p>{r.address}</p>
            </Popup>
          </Marker>
        ))}
        <div className="grid grid-cols-2 gap-3">
          <DebounceInput
            className="px-2 py-1 border border-gray-400 rounded-sm w-full"
            placeholder="Search for a Service"
            minLength={1}
            debounceTimeout={500}
            onChange={(e) => filterResources(e.target.value)}
          />
          <select
            onChange={filterCategory}
            value={selectedCategory}
            className="border border-gray-400 rounded-sm"
          >
            <option>or Filter by Category</option>
            <option>All Services</option>
            {props.categories.map((c: string) => (
              <option key={uniqueIdentifier()} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs italic mt-5">{resources.length} records</p>
        <div className="mt-2 flex flex-col gap-3">
          {resources.map((r: Resource) => (
            <ResourceCard
              key={uniqueIdentifier()}
              address={r.address}
              category={r.category}
              latitude={r.latitude}
              longitude={r.longitude}
              org={r.org}
              postal={r.postal}
              setMarker={props.setMarker}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
