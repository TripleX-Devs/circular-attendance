-- CreateTable
CREATE TABLE "Circular" (
    "id" TEXT NOT NULL,
    "circularUrl" TEXT NOT NULL,
    "batch" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Circular_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Circular_circularUrl_batch_date_key" ON "Circular"("circularUrl", "batch", "date");
