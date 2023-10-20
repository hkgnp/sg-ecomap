import { Flex } from "@chakra-ui/react";
import { Tag } from "@opengovsg/design-system-react";
import Link from "next/link";
import { ResourceActionProps } from "../types";
import { useState } from "react";

export const ResourceActions = ({
  id,
  inactive,
  resource,
  mutate,
}: ResourceActionProps) => {
  const [inactiveState, setInactiveState] = useState<boolean>(inactive!);

  const handleInactive = async () => {
    try {
      await fetch("/api/resources", {
        method: "POST",
        body: JSON.stringify({
          id,
          action: !inactiveState,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      mutate({ ...resource, inactive: inactive });
      setInactiveState(inactiveState ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Flex direction="row" marginTop="4" gap="3">
      <Tag size="xs" cursor="pointer" colorScheme="main">
        <Link href="#">Submit an Edit</Link>
      </Tag>
      <Tag
        onClick={handleInactive}
        size="xs"
        cursor="pointer"
        colorScheme="critical"
      >
        {inactive ? "Mark as Active" : "Mark as Inactive"}
      </Tag>
    </Flex>
  );
};
