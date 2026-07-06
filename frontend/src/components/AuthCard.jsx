import { Paper } from "@mui/material";

function AuthCard({ children }) {
  return (
    <Paper
      elevation={10}
      sx={{
        width: 430,
        p: 5,
        borderRadius: 4,
        backgroundColor: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(12px)",
      }}
    >
      {children}
    </Paper>
  );
}

export default AuthCard;