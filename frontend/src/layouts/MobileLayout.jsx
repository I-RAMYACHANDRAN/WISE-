import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MobileLayout() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#F7F8FC",
      }}
    >
      <Navbar />

      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
}

export default MobileLayout;