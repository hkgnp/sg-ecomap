import type { AppProps } from "next/app";
import { ThemeProvider } from "@opengovsg/design-system-react";
import { theme } from "../theme";
import "inter-ui/inter.css";
import "../styles/leaflet-control-hack.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />;
    </ThemeProvider>
  );
}
