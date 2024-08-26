import { RequestHandler } from "express";
import validator from "./validator";
import { AttendanceSchema } from "./AttendanceSchema";


export const validateAttendance: RequestHandler = (req , res , next) => {
    return validator(AttendanceSchema , req.body , next);
}