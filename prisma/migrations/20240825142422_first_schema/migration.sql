-- CreateTable
CREATE TABLE "Subject" (
    "subject_id" TEXT NOT NULL,
    "subject_name" TEXT NOT NULL,
    "subject_code" TEXT NOT NULL,
    "total_classes" INTEGER NOT NULL,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("subject_id")
);

-- CreateTable
CREATE TABLE "UserAttendance" (
    "roll_Number" INTEGER NOT NULL,
    "present_Days" INTEGER NOT NULL,
    "absent_Days" INTEGER NOT NULL,
    "current_classes" INTEGER NOT NULL,
    "subjectid" TEXT NOT NULL,

    CONSTRAINT "UserAttendance_pkey" PRIMARY KEY ("roll_Number")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "subject_id" TEXT NOT NULL,
    "present" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "roll_Number" INTEGER NOT NULL,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAttendance_subjectid_key" ON "UserAttendance"("subjectid");

-- AddForeignKey
ALTER TABLE "UserAttendance" ADD CONSTRAINT "UserAttendance_subjectid_fkey" FOREIGN KEY ("subjectid") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_roll_Number_fkey" FOREIGN KEY ("roll_Number") REFERENCES "UserAttendance"("roll_Number") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_subject_id_fkey" FOREIGN KEY ("subject_id") REFERENCES "Subject"("subject_id") ON DELETE RESTRICT ON UPDATE CASCADE;
