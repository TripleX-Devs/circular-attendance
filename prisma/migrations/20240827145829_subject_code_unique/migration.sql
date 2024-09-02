/*
  Warnings:

  - A unique constraint covering the columns `[subject_code]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subject_subject_code_key" ON "Subject"("subject_code");