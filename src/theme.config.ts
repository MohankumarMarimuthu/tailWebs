// src/theme.ts
import { TypographyOptions } from "@mui/material/styles/createTypography";

import { createTheme } from "@mui/material/styles";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    detailBold: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  detailBold: React.CSSProperties;
}

const convertPxToRem = (pxValue: number) => {
  const baseFontSize = 16; // Replace this with your base font size in pixels (default is 16px)
  const remValue = pxValue / baseFontSize;
  return remValue;
};

// Function to calculate line height using percentage of font size
const calculateLineHeight = (fontSize: number, percentage: number) => {
  const lineHeight = (fontSize * percentage) / 100;
  return `${lineHeight}rem`;
};

const fontSizes = {
  h6: convertPxToRem(12),
  detailBold: convertPxToRem(15),
};
// Define font weight variables

// Define your custom typography with calculated line height (using a percentage value)
const typography: ExtendedTypographyOptions = {
  fontFamily: "Inter",
  detailBold: {
    fontFamily: "Inter",
    fontSize: `${fontSizes.h6}rem`,
    lineHeight: calculateLineHeight(fontSizes.h6, 125),
    fontWeight: 500,
  },
  // Add more typography variants as needed
};

const theme = createTheme({
  // Add your custom theme configurations here
  typography,
});

export default theme;
