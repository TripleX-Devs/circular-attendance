/*
  Warnings:

  - A unique constraint covering the columns `[roll_Number,subjectid]` on the table `UserAttendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserAttendance_roll_Number_group_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserAttendance_roll_Number_subjectid_key" ON "UserAttendance"("roll_Number", "subjectid");
