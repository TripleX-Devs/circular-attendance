import type { NextFunction, Request, Response } from "express";
import prisma from "../../db";
import { CustomRequest } from "@/validation/jwtVerify";
// Import CustomRequest type

interface Attendance {
  rollNumber: string;
  groupName: string;
  present: boolean;
  subjectName: string;
  date: Date;
}

interface AttendenceTableData {
  rollNumber: string;
  present: boolean;
  subjectId: string;
  date: Date;
}

interface sub {
  subjectId: string;
  subjectName: string;
}

const PostAttendence = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  // Check if the user is a teacher
  if (req.user?.rollType !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can access this route" });
  }

  const AttendanceData: Attendance[] = req.body.data;

  if (!AttendanceData)
    return res.status(404).json({ message: "attendance data not received" });

  try {
    const subjectId = await prisma.subject.findMany({
      select: {
        subjectId: true,
        subjectName: true,
      },
    });

    const SubjectIdMap = new Map(
      subjectId.map((sub: sub) => [sub.subjectName, sub.subjectId]),
    );

    // Check if all users exist
    const rollNumbers = AttendanceData.map((data) => data.rollNumber);
    const users = await prisma.user.findMany({
      where: {
        rollNumber: { in: rollNumbers },
      },
      select: {
        rollNumber: true,
      },
    });

    console.log(users);

    const existingRollNumbers = new Set(users.map((user) => user.rollNumber));
    const missingRollNumbers = rollNumbers.filter(
      (rollNumber) => !existingRollNumbers.has(rollNumber),
    );

    if (missingRollNumbers.length > 0) {
      return res.status(404).json({
        message: "Some users not found",
        missingRollNumbers,
      });
    }

    // filling the attendance table
    const AttendenceTableData: AttendenceTableData[] = AttendanceData.map(
      ({ groupName, ...rest }) => ({
        rollNumber: rest.rollNumber,
        present: rest.present,
        subjectId: SubjectIdMap.get(rest.subjectName) ?? "",
        date: rest.date,
      }),
    );

    await prisma.$transaction(async (prisma) => {
      await prisma.attendance.createMany({
        data: AttendenceTableData,
      });

      // filling the UserAttendance data
      for (const data of AttendanceData) {
        await prisma.userAttendance.upsert({
          where: {
            rollNumber_subjectId: {
              rollNumber: data.rollNumber,
              subjectId: SubjectIdMap.get(data.subjectName) ?? "",
            },
          },
          update: {
            presentDays: {
              increment: data.present ? 1 : 0,
            },
            absentDays: {
              increment: data.present ? 0 : 1,
            },
            currentClasses: {
              increment: 1,
            },
          },
          create: {
            rollNumber: data.rollNumber,
            presentDays: data.present ? 1 : 0,
            absentDays: data.present ? 0 : 1,
            currentClasses: 1,
            subjectId: SubjectIdMap.get(data.subjectName) ?? "",
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
