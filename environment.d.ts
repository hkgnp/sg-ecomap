export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: string;
      RECAPTCHA_SECRET_KEY: string;
      NEXT_PUBLIC_FORMSG_LINK: string;
      NEXT_PUBLIC_FORMSG_FIELD_ID: string;
    }
  }
}
