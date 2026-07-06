import { Box, Typography } from "@mui/material";

function PageHeader({ title, subtitle }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
      >
        {title}
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
      >
        {subtitle}
      </Typography>
    </Box>
  );
}

export default PageHeader;