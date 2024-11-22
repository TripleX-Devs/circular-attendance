import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import { PORT } from "./config/config";
import AttendanceRoutes from "./routes/AttendanceRoutes";
import circularRoutes from "./routes/circularRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is runnig fine" });
});

const base = "/api/v1";

app.use(`${base}/attendance`, AttendanceRoutes);
app.use(`${base}/circular`, circularRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
