import zod from 'zod'
import { AttendanceSchema } from "../validation/AttendanceSchema";


export type AttendenceType = zod.infer<typeof AttendanceSchema>;