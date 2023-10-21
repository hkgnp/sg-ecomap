import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { type InfoBarProps } from "../types";
import { useState } from "react";
import { InfoBarDetails } from "./InfoBarDetails";
import { Comments } from "./comments/Comments";
import { ResourceActions } from "./ResourceActions";
import { DrawerHeaderDetails } from "../drawer/DrawerHeaderDetails";
import { useResource } from "~/src/utils/swr";

export const InfoBar = ({ isOpen, onClose, id }: InfoBarProps) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(
    screen.orientation.type === "portrait-primary" ? true : false,
  );
  screen.orientation.addEventListener("change", (event: Event) => {
    const type = (event.target as ScreenOrientation).type;
    type === "portrait-primary" ? setIsPortrait(true) : setIsPortrait(false);
  });

  const { resource, isLoading, mutate } = useResource(id);
  if (!resource) return null;

  const {
    name,
    address,
    contactNumber,
    email,
    category,
    website,
    postalCode,
    inactive,
  } = resource;

  return (
    <>
      {!isLoading && (
        <Drawer
          placement={isPortrait ? "bottom" : "right"}
          isFullHeight={false}
          autoFocus={false}
          onClose={onClose}
          isOpen={isOpen}
          closeOnEsc={true}
          closeOnOverlayClick={true}
        >
          <DrawerOverlay />
          {/*Set maxH for DrawerContent so it doesn't take up the full height on a small screen when there is long content */}
          <DrawerContent
            maxH={isPortrait ? "80vh" : "100vh"}
            h={isPortrait ? "80vh" : "100vh"}
          >
            <DrawerHeader borderBottomWidth="1px">
              <DrawerHeaderDetails
                name={name}
                category={category}
                inactive={inactive}
                onClose={onClose}
              />
              <InfoBarDetails
                address={address}
                postalCode={postalCode}
                website={website}
                contactNumber={contactNumber}
                email={email}
              />
              <ResourceActions
                id={id}
                inactive={inactive}
                resource={resource}
                mutate={mutate}
              />
            </DrawerHeader>
            <DrawerBody>
              <Comments id={id} />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};
