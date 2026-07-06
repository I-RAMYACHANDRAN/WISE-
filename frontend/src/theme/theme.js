import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#5B3FD0",
    },

    secondary: {
      main: "#B39DDB",
    },

    background: {
      default: "#F7F8FC",
      paper: "#FFFFFF",
    },

    success: {
      main: "#2E7D32",
    },

    info: {
      main: "#0288D1",
    },
  },

  typography: {
    fontFamily: [
      "Poppins",
      "Roboto",
      "sans-serif",
    ].join(","),

    h3: {
      fontWeight: 700,
    },

    h4: {
      fontWeight: 700,
    },

    h5: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },

  shape: {
    borderRadius: 14,
  },

  components: {

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
        },
      },
    },

    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.08)",
        },
      },
    },

    MuiTextField: {
      styleOverrides: {
        root: {
          marginTop: 12,
          marginBottom: 12,
        },
      },
    },

  },
});

export default theme;