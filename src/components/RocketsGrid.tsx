import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { RocketCard } from "./RocketCard";
import { AnimatePresence, motion } from "framer-motion";

export interface RocketHistoryItem {
  time: string;
  type: string;
  speedAfter: number;
}

export interface RocketStatus {
  channel: string;
  type: string;
  speed: number;
  mission: string;
  exploded: boolean;
  lastMessageTime: string;
  history: RocketHistoryItem[];
}

export const RocketsGrid = () => {
  const [rockets, setRockets] = useState<RocketStatus[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8088/rockets");
        const data: RocketStatus[] = await res.json();

        const normalized: RocketStatus[] = data.map((r) => ({
          ...r,
          history: (r.history ?? [])
            .slice()
            .sort(
              (a, b) =>
                new Date(a.time).getTime() - new Date(b.time).getTime()
            )
            .slice(-60),
        }));

        setRockets(normalized);
      } catch (e) {
        console.error("Failed to fetch rockets:", e);
      }
    };

    fetchData();
    const id = setInterval(fetchData, 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <Grid container spacing={2} sx={{ width: "100%" }}>
      <AnimatePresence>
        {rockets.map((rocket) => (
          <Grid key={rocket.channel} size={{xs: 12, sm: 6, md: 4, lg: 3 }}>
            <motion.div
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <RocketCard rocket={rocket} />
            </motion.div>
          </Grid>
        ))}
      </AnimatePresence>
    </Grid>
  );
};



// <Grid key={rocket.channel} size={{xs: 12, sm: 6, md: 4, lg: 3 }}>/**/