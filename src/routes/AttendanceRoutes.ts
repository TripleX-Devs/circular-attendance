import { Router } from "express";
import getAttendance from "../controllers/attendance/getAttendance";
import PostAttendence from "../controllers/attendance/postAttendence";
import { checkForAccessToken } from "@/validation/jwtVerify";

const router = Router();

router.get("/getAttendance/:rollNumber", checkForAccessToken, getAttendance);

router.post("/postAttendence", checkForAccessToken, PostAttendence);

export default router;
