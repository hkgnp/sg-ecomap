import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Button, Spinner, Textarea } from "@opengovsg/design-system-react";
import { ChangeEvent, useState } from "react";
import { CommentCard } from "./CommentCard";
import { PostProps, PostWithAuthor } from "../../types";
import useSWR from "swr";

export const Comments = ({ id }: PostProps) => {
  const [comment, setComment] = useState<string>();
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

  const writeComment = async () => {
    if (!comment || comment.length == 0) return;
    setPostingComments(true);
    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        resourceId: id,
      }),
    });
    const newComment = await res.json();
    mutate([...comments, newComment]);
    setComment("");
    setPostingComments(false);
  };

  return (
    <>
      <Text textStyle="h6" marginTop="5">
        Comments
      </Text>
      <Textarea
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setComment(e.target.value)
        }
        value={comment}
        marginBottom="1"
        size="sm"
        placeholder="Be professional and courteous."
      />
      <Flex justifyContent="end">
        <Button size="xs" onClick={writeComment} marginBottom="2">
          {postingComments && <Spinner ml="-1" mr="1" />}Send
        </Button>
      </Flex>
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
