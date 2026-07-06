import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

import TopBar from "../components/TopBar";
import TimelineItem from "../components/agenda/TimelineItem";

import { getSessions } from "../services/sessionService";

function Agenda() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSessions();
  }, []);

  // const loadSessions = async () => {
  //   try {
  //     const data = await getSessions();
  //     setSessions(data);
  //   } catch (error) {
  //     console.error("Error loading sessions:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadSessions = async () => {
    try {
      const data = await getSessions();

      console.log("API Response:", data);

      setSessions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
  

      {loading ? (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <CircularProgress />
        </Box>
      ) : sessions.length === 0 ? (
        <Typography
          align="center"
          color="text.secondary"
          sx={{ mt: 6 }}
        >
          No sessions available.
        </Typography>
      ) : (
        sessions.map((session) => {
          console.log("Agenda Session:", session);

          return (
            <TimelineItem
              key={session._id}
              session={session}
            />
          );
        })
      //   sessions.map((session) => (
      //     <TimelineItem
      //       key={session._id}
      //       session={session}
      //     />
      //   ))
      )}
    </Box>
  );
}

export default Agenda;