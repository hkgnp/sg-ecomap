import { Flex } from "@chakra-ui/react";
import { Tag } from "@opengovsg/design-system-react";
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
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_FORMSG_LINK}?${process.env.NEXT_PUBLIC_FORMSG_FIELD_ID}=${resource.name}`}
        >
          Submit an Edit
        </a>
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
