import { Flex } from "@chakra-ui/react";
import { Tag } from "@opengovsg/design-system-react";
import { ResourceActionProps } from "../types";

export const ResourceActions = ({ setIsEditing }: ResourceActionProps) => {
  return (
    <Flex direction="row" marginTop="4" gap="3">
      <Tag
        size="xs"
        cursor="pointer"
        colorScheme="main"
        onClick={() => setIsEditing(true)}
      >
        Edit
      </Tag>
      <Tag size="xs" cursor="pointer" colorScheme="critical">
        Delete
      </Tag>
    </Flex>
  );
};
