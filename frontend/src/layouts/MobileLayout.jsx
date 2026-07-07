import { useState } from "react";

import {
  Box,
  Drawer,
  IconButton,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import MobileNavbar from "../components/MobileNavbar";
import TopBar from "../components/TopBar";

function MobileLayout({
  title,
  subtitle,
  children,
}) {

  const [mobileOpen, setMobileOpen] =
    useState(false);

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F7F8FC",
      }}
    >

      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >

        <MobileNavbar
          closeDrawer={() =>
            setMobileOpen(false)
          }
        />

      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
        }}
      >

        <IconButton
          onClick={() =>
            setMobileOpen(true)
          }
          sx={{ mb: 2 }}
        >

          <MenuIcon />

        </IconButton>

        <TopBar
          title={title}
          subtitle={subtitle}
        />

        {children}

      </Box>

    </Box>

  );

}

export default MobileLayout;