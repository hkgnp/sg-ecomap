import { format } from "date-fns";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { RxAvatar } from "react-icons/rx";
import { Post } from "@prisma/client";

export const CommentCard = ({ author, content, createdAt }: Post) => {
  return (
    <>
      <Card marginBottom="4">
        <CardBody>
          <Stack divider={<StackDivider />} spacing="3">
            <Box>
              <Text textStyle="body-2">{content}</Text>
            </Box>
            <Flex flexDirection="row" justifyContent="space-between">
              <Text textStyle="caption-1" display="flex" gap="1">
                <RxAvatar size="14" /> {author}
              </Text>
              <Text textStyle="caption-1">
                {format(new Date(createdAt), "dd-MM-yyyy")}
              </Text>
            </Flex>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
