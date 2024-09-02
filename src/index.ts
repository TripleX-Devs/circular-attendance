import express, { Request, NextFunction, Response } from "express";
import cors from "cors";
import { NODE_ENV, PORT } from "./config/config";
import createHttpError from "http-errors";
import AttendanceRoutes from "./routes/AttendanceRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.json({ message: "Server is runnig fine" });
});

app.use("/api/v1/attendance", AttendanceRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof createHttpError.HttpError) {
    res.status(err.status).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
