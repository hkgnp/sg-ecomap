import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { CommentCard } from "./CommentCard";
import { PostProps } from "../../types";
import useSWR from "swr";
import WriteComments from "./WriteComments";
import { Post } from "@prisma/client";

export const Comments = ({ id }: PostProps) => {
  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const useComments = () => {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/comments?${new URLSearchParams({ id })}`,
      fetcher,
    );
    return {
      comments: data,
      isLoading,
      isError: error,
      mutate: mutate,
    };
  };

  const { comments, isLoading, mutate } = useComments();

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
