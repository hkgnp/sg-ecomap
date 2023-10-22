import { Flex, Input } from "@chakra-ui/react";
import { Button, Textarea } from "@opengovsg/design-system-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { WriteCommentsProps } from "../../types";

const WriteComments = ({ id, update }: WriteCommentsProps) => {
  const [content, setContent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    recaptchaRef.current?.execute();
  };

  const onReCAPTCHAChange = async (captchaCode: string | null) => {
    if (!captchaCode) return;
    if (recaptchaRef.current) {
      try {
        update.mutate({
          resourceId: id,
          author,
          captcha: captchaCode,
          content: content,
        });
        setContent("");
        setAuthor("");
      } catch (error) {
        return console.log(error);
      } finally {
        recaptchaRef.current.reset();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        value={content}
        marginBottom="1"
        size="sm"
        placeholder="Be professional and courteous."
        required
      />
      <Flex justifyContent="end" gap="2">
        <Input
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAuthor(e.target.value)
          }
          value={author}
          size="xs"
          placeholder="Enter your name"
          marginBottom="1"
          required
        />
        <Button type="submit" size="xs" marginBottom="2">
          Submit
        </Button>
      </Flex>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
        onChange={onReCAPTCHAChange}
      />
    </form>
  );
};

export default WriteComments;
