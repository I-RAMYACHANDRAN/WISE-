import { useMediaQuery, useTheme } from "@mui/material";

import MobileLayout from "./MobileLayout";
import DesktopLayout from "./DesktopLayout";

function MainLayout({
  title,
  subtitle,
  children,
}) {

  const theme = useTheme();

  const isMobile = useMediaQuery(
    theme.breakpoints.down("md")
  );

  if (isMobile) {
    return (
      <MobileLayout
        title={title}
        subtitle={subtitle}
      >
        {children}
      </MobileLayout>
    );
  }

  return (
    <DesktopLayout
      title={title}
      subtitle={subtitle}
    >
      {children}
    </DesktopLayout>
  );
}

export default MainLayout;