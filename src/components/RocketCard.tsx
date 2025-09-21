import {
  Card,
  CardContent,
  Typography,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from "recharts";

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

export const RocketCard = ({ rocket }: { rocket: RocketStatus }) => {
  console.log("Rocket:", rocket);

  const chartData = (rocket.history ?? []).map((h) => ({
    time: new Date(h.time).toLocaleTimeString(),
    speed: h.speedAfter,
  }));

  return (
    <Card
      sx={{
        minWidth: 250,
        backgroundColor: rocket.exploded ? "#ffebee" : "#e8f5e9",
      }}
    >
      <CardContent>
        <Typography variant="h6">{rocket.type || "Unknown Rocket"}</Typography>
        <Typography color="text.secondary">Channel: {rocket.channel}</Typography>
        <Typography>Mission: {rocket.mission || "-"}</Typography>
        <Typography>Speed: {rocket.speed} km/h</Typography>
        <Typography variant="body2" color="text.secondary">
          Last Update: {new Date(rocket.lastMessageTime).toLocaleTimeString()}
        </Typography>
        <Chip
          label={rocket.exploded ? "Exploded" : "Active"}
          color={rocket.exploded ? "error" : "success"}
          sx={{ mt: 1, mb: 1 }}
        />

        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={chartData}>
            <XAxis dataKey="time" hide />
            <YAxis hide domain={[0, "dataMax + 1000"]} />
            <Line
              type="monotone"
              dataKey="speed"
              stroke={rocket.exploded ? "red" : "#1976d2"}
              dot={false}
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>

        <Accordion sx={{ mt: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="body2">Message History</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {rocket.history?.slice().reverse().map((msg, idx) => (
                <ListItem key={idx}>
                  <ListItemText
                    primary={`${msg.type} @ ${new Date(
                      msg.time
                    ).toLocaleTimeString()}`}
                    secondary={`Speed after: ${msg.speedAfter} km/h`}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};