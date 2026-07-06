import { Box, Typography } from "@mui/material";

import loginBg from "../assets/images/login-bg.jpg";

function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundImage: `
        linear-gradient(
        rgba(62,39,140,0.75),
        rgba(91,63,208,0.75)
        ),
        url(${loginBg})
      `,

        backgroundSize: "cover",
        backgroundPosition: "center",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        px: 3,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          color: "white",
          maxWidth: 500,
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
        >
          WISE Connect
        </Typography>

        <Typography
          variant="h5"
          mb={2}
        >
          Women in Science & Engineering
        </Typography>

        <Typography
          mb={5}
        >
          Connect • Learn • Inspire • Lead
        </Typography>

        {children}

      </Box>

    </Box>
  );
}

export default AuthLayout;