/*
  Warnings:

  - The primary key for the `UserAttendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `UserAttendance` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_roll_Number_fkey";

-- AlterTable
ALTER TABLE "UserAttendance" DROP CONSTRAINT "UserAttendance_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "UserAttendance_pkey" PRIMARY KEY ("id");
