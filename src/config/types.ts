import type zod from "zod";
import type { AttendanceSchema } from "../validation/AttendanceSchema";

export type AttendenceType = zod.infer<typeof AttendanceSchema>;
