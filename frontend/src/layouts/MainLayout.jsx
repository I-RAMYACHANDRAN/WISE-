import { useState } from "react";

import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

const drawerWidth = 280;

function MainLayout({
  title,
  subtitle,
  children,
}) {

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

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

      {isMobile ? (

        <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
      >
          <Navbar
            closeDrawer={() =>
              setMobileOpen(false)
            }
          />
        </Drawer>

      ) : (

        <Navbar />

      )}

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: isMobile ? 0 : `${drawerWidth}px`,
          p: {
            xs: 2,
            md: 4,
          },
        }}
      >

        {isMobile && (

          <IconButton
            onClick={() =>
              setMobileOpen(true)
            }
            sx={{ mb: 2 }}
          >
            <MenuIcon />
          </IconButton>

        )}

        <TopBar
          title={title}
          subtitle={subtitle}
        />

        {children}

      </Box>

    </Box>

  );

}

export default MainLayout;