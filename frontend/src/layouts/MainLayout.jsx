import {
  useTheme,
  useMediaQuery,
} from "@mui/material";

import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

function MainLayout({
  title,
  subtitle,
  children,
}) {

  const theme = useTheme();

  const isMobile =
    useMediaQuery(
      theme.breakpoints.down("md")
    );

  return isMobile ? (

    <MobileLayout
      title={title}
      subtitle={subtitle}
    >
      {children}
    </MobileLayout>

  ) : (

    <DesktopLayout
      title={title}
      subtitle={subtitle}
    >
      {children}
    </DesktopLayout>

  );

}

export default MainLayout;