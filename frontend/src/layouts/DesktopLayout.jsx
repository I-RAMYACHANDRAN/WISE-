import {
  Box,
} from "@mui/material";

import DesktopNavbar from "../components/DesktopNavbar";
import TopBar from "../components/TopBar";

const drawerWidth = 280;

function DesktopLayout({
  title,
  subtitle,
  children,
}) {

  return (

    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "#F7F8FC",
      }}
    >

      <DesktopNavbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: `${drawerWidth}px`,
          p: 4,
        }}
      >

        <TopBar
          title={title}
          subtitle={subtitle}
        />

        {children}

      </Box>

    </Box>

  );

}

export default DesktopLayout;