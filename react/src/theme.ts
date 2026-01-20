import { createTheme } from "@mantine/core";

// Create a custom theme - extracted to a separate file for better code splitting
export const theme = createTheme({
  /** Theme customizations */
  primaryColor: "indigo",
  colors: {
    // Add custom colors
    brand: [
      "#E9EDFC",
      "#C1CCF6",
      "#99ABF0",
      "#717FEA",
      "#4A5AE3",
      "#2234DD",
      "#1B2AB0",
      "#141F84",
      "#0E1558",
      "#070B2C",
    ],
  },
  // Optimize font loading
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  // Improve performance with fewer CSS variables
  components: {
    Container: {
      defaultProps: {
        sizes: {
          xs: 540,
          sm: 720,
          md: 960,
          lg: 1140,
          xl: 1320,
        },
      },
    },
  },
});
