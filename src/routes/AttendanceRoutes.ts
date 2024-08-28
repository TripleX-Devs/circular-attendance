import { Router } from "express";
import getAttendance from "../controllers/attendance/getAttendance";

const router = Router();


router.get('/getAttendance/:roll_Number', getAttendance);


export default router;