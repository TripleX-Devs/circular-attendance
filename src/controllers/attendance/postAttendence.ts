import type { NextFunction, Request, Response } from "express";
import prisma from "../../db";

interface Attendance {
  RollNumber: string;
  GroupName: string;
  Present: boolean;
  SubjectName: string;
  Date: Date;
}

interface AttendenceTableData {
  roll_Number: string;
  present: boolean;
  subject_id: string;
  date: Date;
}

interface sub {
  subject_id: string;
  subject_name: string;
}

const PostAttendence = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const AttendanceData: Attendance[] = req.body.data;

  if (!AttendanceData)
    return res.status(404).json({ message: "attendance data not received" });

  const SubjectId = await prisma.subject.findMany({
    select: {
      subject_id: true,
      subject_name: true,
    },
  });

  const SubjectIdMap = new Map(
    SubjectId.map((sub: sub) => [sub.subject_name, sub.subject_id]),
  );

  // filling the attendance table
  const AttendenceTableData: AttendenceTableData[] = AttendanceData.map(
    ({ GroupName, ...rest }) => ({
      roll_Number: rest.RollNumber,
      present: rest.Present,
      subject_id: SubjectIdMap.get(rest.SubjectName) ?? "",
      date: rest.Date,
    }),
  );

  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.attendance.createMany({
        data: AttendenceTableData,
      });

      // filling the UserAttendance data
      for (const data of AttendanceData) {
        await prisma.userAttendance.upsert({
          where: {
            roll_Number_subjectid: {
              roll_Number: data.RollNumber,
              subjectid: SubjectIdMap.get(data.SubjectName) ?? "",
            },
          },
          update: {
            present_Days: {
              increment: data.Present ? 1 : 0,
            },
            absent_Days: {
              increment: data.Present ? 0 : 1,
            },
            current_classes: {
              increment: 1,
            },
          },
          create: {
            roll_Number: data.RollNumber,
            group: data.GroupName,
            present_Days: data.Present ? 1 : 0,
            absent_Days: data.Present ? 0 : 1,
            current_classes: 1,
            subjectid: SubjectIdMap.get(data.SubjectName) ?? "",
          },
        });
      }
    });

    res.status(200).json({ message: "attendance data processed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred while processing attendance data",
      error,
    });
  }
};

export default PostAttendence;
