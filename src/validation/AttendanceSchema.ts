import zod, { date, number } from 'zod';

export const AttendanceSchema = zod.object({
    roll_Number : zod.string(),
    subject_name : zod.string(),
    date : zod.date(),
    present : zod.boolean(),
})

