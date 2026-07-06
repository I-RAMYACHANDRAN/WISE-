import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

function QuickAccessCard({ title, icon, path }) {

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(path)}
      sx={{
        cursor: "pointer",
        borderRadius: 4,
        transition: "0.25s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          py: 4,
        }}
      >
        <Typography fontSize={40}>
          {icon}
        </Typography>

        <Typography
          variant="h6"
          fontWeight={700}
          mt={2}
        >
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default QuickAccessCard;