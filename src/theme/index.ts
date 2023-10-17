import { extendTheme } from "@chakra-ui/react";
import { theme as ogpDsTheme } from "@opengovsg/design-system-react";
import { shadows } from "./foundations/shadows";
import { layerStyles } from "./layerStyles";
import { colors } from "./foundations/colors";

export const theme = extendTheme(ogpDsTheme, {
  shadows,
  colors,
  components: {
    ...ogpDsTheme.components,
  },
  layerStyles,
});
