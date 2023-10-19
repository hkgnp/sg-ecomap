import type { AppProps } from "next/app";
import { ThemeProvider } from "@opengovsg/design-system-react";
import { theme } from "../theme";
import "inter-ui/inter.css";
import "../styles/leaflet-control-hack.css";
import "../styles/recaptcha-hidden.css";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>SG ECOMAP</title>
        <link rel="icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
