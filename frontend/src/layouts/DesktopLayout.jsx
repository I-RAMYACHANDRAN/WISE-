import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function DesktopLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F5F6FA",
      }}
    >
      <Navbar />

      <Container
        maxWidth="xl"
        sx={{
          py: 4,
        }}
      >
        <Outlet />
      </Container>

      <Footer />
    </Box>
  );
}

export default DesktopLayout;