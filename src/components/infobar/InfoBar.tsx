import { trpc } from "@/utils/trpc";
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

export const InfoBar = ({ isOpen, onClose, id }: InfoBarProps) => {
  const [isPortrait, setIsPortrait] = useState<boolean>(
    screen.orientation.type === "portrait-primary" ? true : false,
  );
  screen.orientation.addEventListener("change", (event: Event) => {
    const type = (event.target as ScreenOrientation).type;
    type === "portrait-primary" ? setIsPortrait(true) : setIsPortrait(false);
  });

  const utils = trpc.useContext();
  const res = trpc.resources.findOne.useQuery({ id });
  const update = trpc.resources.updateActive.useMutation({
    async onMutate() {
      const prevData = utils.resources.findOne.getData();
      return prevData;
    },
    onSettled() {
      utils.resources.findOne.invalidate();
    },
  });

  const resource = res.data;
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

  const handleInactive = () => {
    update.mutate({
      id,
      action: !inactive,
    });
  };

  return (
    <>
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
              handleInactive={handleInactive}
              inactive={inactive}
              resource={resource}
            />
          </DrawerHeader>
          <DrawerBody>
            <Comments id={id} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
