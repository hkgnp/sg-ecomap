import { Flex, Skeleton, Stack, Text } from "@chakra-ui/react";
import { Button, Textarea } from "@opengovsg/design-system-react";
import { ChangeEvent, useEffect, useState } from "react";
import { CommentCard } from "./CommentCard";
import { PostProps, PostWithAuthor } from "../../types";

export const Comments = ({ id }: PostProps) => {
  const [loaded, setLoaded] = useState<boolean>(false);
  const [postsArr, setPostsArr] = useState<PostWithAuthor[]>();
  const [comment, setComment] = useState<string>();

  const fetchComments = async () => {
    const response = await fetch(
      "/api/comments?" +
        new URLSearchParams({
          id,
        }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const { result } = await response.json();
    setPostsArr(result);
    // TODO Skeleton can be cleaner
    setLoaded(true);
  };

  useEffect(() => {
    (async () => {
      await fetchComments();
    })();
  }, []);

  const writeComment = async () => {
    if (!comment || comment.length == 0) return;
    setLoaded(false);
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        content: comment,
        resourceId: id,
      }),
    });
    await fetchComments();
    setComment("");
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
          Send
        </Button>
      </Flex>
      {!loaded && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      {loaded &&
        postsArr &&
        postsArr.map((p) => (
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
