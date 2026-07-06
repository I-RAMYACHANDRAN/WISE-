import { Box } from "@mui/material";

import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";

function MainLayout({

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

      <Navbar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: "280px",
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

export default MainLayout;