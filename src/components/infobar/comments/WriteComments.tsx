import { Flex } from "@chakra-ui/react";
import { Button, Textarea } from "@opengovsg/design-system-react";
import { ChangeEvent, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { WriteCommentsProps } from "../../types";

const WriteComments = ({ id, comments, mutate }: WriteCommentsProps) => {
  const [comment, setComment] = useState<string>();
  const recaptchaRef = useRef<any>();

  const writeComment = async () => {
    if (!comment || comment.length == 0) return;
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
  };

  const onReCAPTCHAChange = (captchaCode: any) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
      return;
    }
    if (recaptchaRef.current) {
      // Else reCAPTCHA was executed successfully so proceed with the
      // alert
      alert(`Hey, ${comment}`);
      // Reset the reCAPTCHA so that it can be executed again if user
      // submits another email.
      recaptchaRef.current.reset();
    }
  };

  return (
    <>
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
          {/* {postingComments && <Spinner ml="-1" mr="1" />}Send */}
          Send
        </Button>
      </Flex>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={onReCAPTCHAChange}
      />
    </>
  );
};

export default WriteComments;
