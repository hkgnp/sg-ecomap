import dynamic from "next/dynamic";

const Home = () => {
  const MapWithNoSSR = dynamic(() => import("../components/map"), {
    ssr: false,
  });

  return (
    <div id="map">
      <MapWithNoSSR />
    </div>
  );
};

export default Home;
