import express, { Request, Response } from "express";
import cors from "cors";
import { PORT } from "./config/config";
import createHttpError from "http-errors";
import AttendanceRoutes from "./routes/AttendanceRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Server is runnig fine" });
});

app.use("/api/v1/attendance", AttendanceRoutes);

app.use((err: Error, req: Request, res: Response) => {
  if (err instanceof createHttpError.HttpError) {
    res.status(err.status).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
