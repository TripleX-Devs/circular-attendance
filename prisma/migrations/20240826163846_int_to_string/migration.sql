/*
  Warnings:

  - The primary key for the `UserAttendance` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_roll_Number_fkey";

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "roll_Number" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UserAttendance" DROP CONSTRAINT "UserAttendance_pkey",
ALTER COLUMN "roll_Number" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserAttendance_pkey" PRIMARY KEY ("roll_Number");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_roll_Number_fkey" FOREIGN KEY ("roll_Number") REFERENCES "UserAttendance"("roll_Number") ON DELETE RESTRICT ON UPDATE CASCADE;
