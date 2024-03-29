import { Wrap, WrapItem } from "@chakra-ui/react";
import { Tag } from "@opengovsg/design-system-react";
import { ResourceActionProps } from "../types";

export const ResourceActions = ({
  handleInactive,
  inactive,
  resource,
}: ResourceActionProps) => {
  return (
    <Wrap marginTop="4" spacing="2" align="center">
      <WrapItem>
        <Tag size="xs" cursor="pointer" colorScheme="main">
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={`${process.env.NEXT_PUBLIC_FORMSG_LINK}?${process.env.NEXT_PUBLIC_FORMSG_FIELD_ID}=${resource.name}`}
          >
            Submit an Edit
          </a>
        </Tag>
      </WrapItem>

      <WrapItem>
        <Tag
          onClick={handleInactive}
          size="xs"
          cursor="pointer"
          colorScheme="critical"
        >
          {inactive ? "Mark as Active" : "Mark as Inactive"}
        </Tag>
      </WrapItem>

      <WrapItem>
        <Tag
          size="xs"
          cursor="pointer"
          colorScheme="success"
          textAlign="center"
        >
          <a
            rel="noopener noreferrer"
            target="_blank"
            href={process.env.NEXT_PUBLIC_FORMSG_LINK}
          >
            Suggest New Resource
          </a>
        </Tag>
      </WrapItem>
    </Wrap>
  );
};
