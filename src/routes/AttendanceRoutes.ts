import { Router } from "express";
import getAttendance from "../controllers/attendance/getAttendance";
import PostAttendence from "../controllers/attendance/postAttendence";

const router = Router();

router.get("/getAttendance/:roll_Number", getAttendance);

router.post("/postAttendence" , PostAttendence)

export default router;
