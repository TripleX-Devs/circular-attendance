/*
  Warnings:

  - A unique constraint covering the columns `[id,batch]` on the table `Circular` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Circular_circularUrl_batch_key";

-- CreateIndex
CREATE UNIQUE INDEX "Circular_id_batch_key" ON "Circular"("id", "batch");
