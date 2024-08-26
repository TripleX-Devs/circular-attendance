/*
  Warnings:

  - Added the required column `group` to the `UserAttendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserAttendance" ADD COLUMN     "group" TEXT NOT NULL;
