import { Box } from "@mui/material";

import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <AdminSidebar />

      <Box
        sx={{
          flex: 1,
          ml: "280px",
          bgcolor: "#F5F7FA",
          minHeight: "100vh",
          p: 5,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

export default AdminLayout;