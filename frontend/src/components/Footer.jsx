import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 5,
        py: 2,
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="body2">
        © 2026 WISE Conference. All Rights Reserved.
      </Typography>
    </Box>
  );
}

export default Footer;