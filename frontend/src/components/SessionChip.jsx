import { Chip } from "@mui/material";

const chipColors = {
  Keynote: "#8E24AA",
  "Technical Session": "#1976D2",
  Workshop: "#2E7D32",
  "Paper Presentation": "#F57C00",
  "Poster Presentation": "#00897B",
  "Panel Discussion": "#7B1FA2",
  "Networking Event": "#E91E63",
  "Cultural Event": "#5E35B1",
};

function SessionChip({ type }) {
  return (
    <Chip
      label={type}
      sx={{
        backgroundColor: chipColors[type] || "#616161",
        color: "white",
        fontWeight: 600,
        borderRadius: "8px",
      }}
    />
  );
}

export default SessionChip;