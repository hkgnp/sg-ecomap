import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { CommentCard } from "./CommentCard";
import { PostProps } from "../../types";
import WriteComments from "./WriteComments";
import { Post } from "@prisma/client";
import { useComments } from "~/src/utils/swr";

export const Comments = ({ id }: PostProps) => {
  const { comments, isLoading, mutate } = useComments(id);

  return (
    <>
      <Text textStyle="h6" marginTop="5">
        Comments
      </Text>
      <WriteComments id={id} comments={comments} mutate={mutate} />
      {isLoading && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      {!isLoading &&
        comments.map((p: Post) => (
          <CommentCard
            key={p.id}
            id={p.id}
            author={p.author}
            content={p.content}
            contentHtml={p.contentHtml}
            createdAt={p.createdAt}
            resourceId={p.resourceId}
          />
        ))}
    </>
  );
};
