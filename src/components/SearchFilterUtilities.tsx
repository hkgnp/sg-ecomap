import { Box, Flex } from "@chakra-ui/react";
import { Input, Button, SingleSelect } from "@opengovsg/design-system-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { PiMagnifyingGlassBold } from "react-icons/pi";
import { SearchFilterUtilsProps } from "./types";
import { Marker, useMap } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import L from "leaflet";

export const SearchFilterUtilities = ({
  filterResources,
  categories,
}: SearchFilterUtilsProps) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [locationLatLng, setLocationLatLng] = useState<
    LatLngExpression | undefined
  >();

  const map = useMap();
  const icon = L.icon({
    iconUrl: "/assets/pins/iamhere.svg",
    iconRetinaUrl: "/assets/pins/iamhere.svg",
    iconSize: [32, 32],
  });

  const handleInput = async (e: FormEvent) => {
    e.preventDefault();

    //@ts-ignore
    if (searchTerm.length === 6 && !isNaN(searchTerm)) {
      const result = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${searchTerm}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
      );
      const { LATITUDE: lat, LONGITUDE: lng } = (await result.json())
        .results[0];

      setLocationLatLng([lat, lng]);
      map.setView([lat, lng], 16);
    }
    filterResources(searchTerm);
  };

  const handleFilterCategory = (value: string) => {
    setSelectedCategory(value);
    filterResources(value);
  };

  const handleToggle = (type: string) => {
    switch (type) {
      case "search":
        if (!searchOpen && filterOpen) {
          setFilterOpen(false);
          setSearchOpen(true);
        } else if (!searchOpen) {
          setSearchOpen(true);
        } else {
          setSearchOpen(false);
        }
        return;
      case "filter":
        if (!filterOpen && searchOpen) {
          setSearchOpen(false);
          setFilterOpen(true);
        } else if (!filterOpen) {
          setFilterOpen(true);
        } else {
          setFilterOpen(false);
        }
        return;
      default:
        return;
    }
  };

  return (
    <>
      {locationLatLng && <Marker icon={icon} position={locationLatLng} />}
      <Flex
        direction="row"
        gap="1"
        position="absolute"
        top="2"
        left="2"
        maxWidth="100vw"
        zIndex={99999}
      >
        <Button
          onClick={() => handleToggle("search")}
          variant="solid"
          size="xs"
          fontSize="xs"
          rounded="2xl"
        >
          <PiMagnifyingGlassBold />
        </Button>
        <form onSubmit={handleInput}>
          <Input
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            value={searchTerm}
            display={searchOpen ? "block" : "none"}
            placeholder="Search..."
            size="xs"
            width="210px"
            rounded="2xl"
            borderColor="teal"
          />
        </form>
        <Button
          onClick={() => handleToggle("filter")}
          variant="solid"
          size="xs"
          fontSize="xs"
          rounded="2xl"
        >
          Filter
        </Button>
        <Box display={filterOpen ? "block" : "none"} rounded="2xl" maxW="60">
          <SingleSelect
            value={selectedCategory}
            items={categories}
            name="categories"
            onChange={handleFilterCategory}
            size="xs"
          />
        </Box>
      </Flex>
    </>
  );
};
