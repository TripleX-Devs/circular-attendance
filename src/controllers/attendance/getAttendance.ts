import type { NextFunction, Request, Response } from "express";
import prisma from "../../db";

const getAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.roll_Number) {
    return res.status(400).json({ message: "please provide roll number" });
  }
  const rollNumber = req.params.rollNumber;
  const subjectName = req.body.subjectName;
  console.log(rollNumber);
  try {
    const subject = await prisma.subject.findFirst({
      where: {
        subjectName: subjectName,
      },
      select: {
        subjectId: true,
      },
    });
    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }
    console.log("subect id " + JSON.stringify(subject));
    const attendanceData = await prisma.userAttendance.findFirst({
      where: {
        rollNumber: rollNumber,
        subjectId: subject.subjectId,
      },
    });
    console.log("Attendence data " + JSON.stringify(attendanceData));
    if (!attendanceData) {
      return res.status(404).json({ message: "attendence data not found" });
    }

    const presentDays = attendanceData.presentDays;
    const totalDays = attendanceData.currentClasses;
    const percentage = (presentDays / totalDays) * 100;
    if (presentDays === 0 && totalDays === 0) {
      return res.json({
        message: "Attendance data found",
        data: {
          presentDays: presentDays,
          totalDays: totalDays,
          percentage: 0,
        },
      });
    }
    return res.json({
      date: {
        presentDays: presentDays,
        totalDays: totalDays,
        percentage: percentage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};
export default getAttendance;
