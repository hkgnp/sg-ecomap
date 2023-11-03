import { Skeleton, Stack, Text } from "@chakra-ui/react";
import { CommentCard } from "./CommentCard";
import { PostProps } from "../../types";
import WriteComments from "./WriteComments";
import { trpc } from "@/utils/trpc";

export const Comments = ({ id }: PostProps) => {
  const utils = trpc.useContext();
  const res = trpc.comments.find.useQuery({ id }, { enabled: !!id });
  const update = trpc.comments.post.useMutation({
    async onMutate() {
      return utils.comments.find.getData();
    },
    onSettled() {
      utils.comments.find.invalidate();
    },
  });

  const comments = res.data;
  if (!comments) return null;

  return (
    <>
      <Text textStyle="h6" marginTop="5">
        Comments
      </Text>
      <WriteComments id={id} update={update} />
      {!comments && (
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      )}
      {comments &&
        comments.map((p) => (
          <CommentCard
            key={p.id}
            id={p.id}
            author={p.author}
            content={p.content}
            contentHtml={p.contentHtml}
            createdAt={new Date(p.createdAt)}
            resourceId={p.resourceId}
          />
        ))}
    </>
  );
};
