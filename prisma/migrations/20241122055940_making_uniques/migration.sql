/*
  Warnings:

  - You are about to drop the column `date` on the `Circular` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[circularUrl,batch]` on the table `Circular` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[roll_Number,group]` on the table `UserAttendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `deleteAt` to the `Circular` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Circular` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Circular` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Circular_circularUrl_batch_date_key";

-- AlterTable
ALTER TABLE "Circular" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deleteAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Circular_circularUrl_batch_key" ON "Circular"("circularUrl", "batch");

-- CreateIndex
CREATE UNIQUE INDEX "UserAttendance_roll_Number_group_key" ON "UserAttendance"("roll_Number", "group");
