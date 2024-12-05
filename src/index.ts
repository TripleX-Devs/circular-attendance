import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from "./config/config";
import AttendanceRoutes from "./routes/AttendanceRoutes";
import CircularRoutes from "./routes/circularRoute"

import kafka from "./kafka";
import process from "process";

const app = express();
app.use(cors())

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is running fine" });
});


const base = "/api/v1";
app.use(`${base}/attendance`, AttendanceRoutes);
app.use(`${base}/circular`, CircularRoutes);

(async () => {
  try {
    await kafka();
    console.log("Kafka consumer initialized");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize Kafka or server:", error);
    process.exit(1);
  }
})();


const shutdown = async () => {
  console.log("Shutting down server...");
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);


app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});
