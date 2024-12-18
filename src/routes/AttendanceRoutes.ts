import { Router } from "express";
import getAttendance from "../controllers/attendance/getAttendance";
import PostAttendence from "../controllers/attendance/postAttendence";
import { checkForAccessToken } from "../validation/jwtVerify";
import getAttendanceByGroup from "../controllers/attendance/getAttendanceByGroup";

const router = Router();

router.get("/getAttendance/:rollNumber", checkForAccessToken, getAttendance);
router.get(
  "/getAttendanceByGroup/:group",
  checkForAccessToken,
  getAttendanceByGroup,
);

router.post("/postAttendence", checkForAccessToken, PostAttendence);

export default router;
