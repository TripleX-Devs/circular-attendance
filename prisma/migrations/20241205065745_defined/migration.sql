/*
  Warnings:

  - The primary key for the `Attendance` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roll_Number` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Attendance` table. All the data in the column will be lost.
  - The primary key for the `Subject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subject_code` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `subject_id` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `subject_name` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `total_classes` on the `Subject` table. All the data in the column will be lost.
  - You are about to drop the column `absent_Days` on the `UserAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `current_classes` on the `UserAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `group` on the `UserAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `present_Days` on the `UserAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `roll_Number` on the `UserAttendance` table. All the data in the column will be lost.
  - You are about to drop the column `subjectid` on the `UserAttendance` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subjectCode]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rollNumber,subjectId]` on the table `UserAttendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rollNumber` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectCode` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - The required column `subjectId` was added to the `Subject` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `subjectName` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalClasses` to the `Subject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rollNumber` to the `UserAttendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subjectId` to the `UserAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_subject_id_fkey";

-- DropForeignKey
ALTER TABLE "UserAttendance" DROP CONSTRAINT "UserAttendance_subjectid_fkey";

-- DropIndex
DROP INDEX "Subject_subject_code_key";

-- DropIndex
DROP INDEX "UserAttendance_roll_Number_subjectid_key";

-- AlterTable
ALTER TABLE "Attendance" DROP CONSTRAINT "Attendance_pkey",
DROP COLUMN "roll_Number",
DROP COLUMN "subject_id",
ADD COLUMN     "rollNumber" TEXT NOT NULL,
ADD COLUMN     "subjectId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Attendance_id_seq";

-- AlterTable
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_pkey",
DROP COLUMN "subject_code",
DROP COLUMN "subject_id",
DROP COLUMN "subject_name",
DROP COLUMN "total_classes",
ADD COLUMN     "subjectCode" TEXT NOT NULL,
ADD COLUMN     "subjectId" TEXT NOT NULL,
ADD COLUMN     "subjectName" TEXT NOT NULL,
ADD COLUMN     "totalClasses" INTEGER NOT NULL,
ADD CONSTRAINT "Subject_pkey" PRIMARY KEY ("subjectId");

-- AlterTable
ALTER TABLE "UserAttendance" DROP COLUMN "absent_Days",
DROP COLUMN "current_classes",
DROP COLUMN "group",
DROP COLUMN "present_Days",
DROP COLUMN "roll_Number",
DROP COLUMN "subjectid",
ADD COLUMN     "absentDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "currentClasses" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "presentDays" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "rollNumber" TEXT NOT NULL,
ADD COLUMN     "subjectId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "rollNumber" TEXT NOT NULL,
    "group" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("rollNumber")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subject_subjectCode_key" ON "Subject"("subjectCode");

-- CreateIndex
CREATE UNIQUE INDEX "UserAttendance_rollNumber_subjectId_key" ON "UserAttendance"("rollNumber", "subjectId");

-- AddForeignKey
ALTER TABLE "UserAttendance" ADD CONSTRAINT "UserAttendance_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAttendance" ADD CONSTRAINT "UserAttendance_rollNumber_fkey" FOREIGN KEY ("rollNumber") REFERENCES "User"("rollNumber") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("subjectId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_rollNumber_fkey" FOREIGN KEY ("rollNumber") REFERENCES "User"("rollNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
