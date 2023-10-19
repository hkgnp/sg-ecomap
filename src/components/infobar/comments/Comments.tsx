import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { CommentCard } from "./CommentCard";
import { PostProps, PostWithAuthor } from "../../types";
import useSWR from "swr";
import WriteComments from "./WriteComments";

export const Comments = ({ id }: PostProps) => {
  const [postingComments, setPostingComments] = useState(false);

  // @ts-ignore
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const useComments = () => {
    const { data, error, isLoading, mutate } = useSWR(
      `/api/comments?${new URLSearchParams({ id })}`,
      fetcher,
    );
    return {
      comments: data as PostWithAuthor[],
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
        comments.map((p) => (
          <CommentCard
            key={p.id}
            authorName={p.author.name}
            title={p.title}
            content={p.content}
            updatedAt={p.updatedAt}
          />
        ))}
    </>
  );
};
