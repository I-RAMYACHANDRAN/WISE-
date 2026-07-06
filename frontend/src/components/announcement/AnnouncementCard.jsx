import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
} from "@mui/material";

function AnnouncementCard({
  announcement,
  isNew,
}) {

  return (

    <Card
      sx={{
        mb: 3,
        borderRadius: 3,
        boxShadow: isNew ? 5 : 2,
        borderLeft: isNew
          ? "6px solid #6C3EF4"
          : "6px solid transparent",
        bgcolor: isNew
          ? "#F8F5FF"
          : "#FFFFFF",
        transition: "0.25s",
      }}
    >

      <CardContent>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >

          <Typography
            variant="h6"
            sx={{
              fontWeight: isNew ? "bold" : 600,
            }}
          >
            {announcement.title}
          </Typography>

          {isNew && (

            <Chip
              label="NEW"
              color="secondary"
              size="small"
              sx={{
                fontWeight: "bold",
              }}
            />

          )}

        </Box>

        <Typography
          variant="body1"
          sx={{
            fontWeight: isNew ? 500 : 400,
            color: "text.secondary",
            mb: 2,
          }}
        >
          {announcement.message}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
        >
          {new Date(
            announcement.createdAt
          ).toLocaleString()}
        </Typography>

      </CardContent>

    </Card>

  );

}

export default AnnouncementCard;