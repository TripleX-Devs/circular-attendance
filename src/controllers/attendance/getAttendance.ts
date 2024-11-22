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
  const rollNumber = req.params.roll_Number;
  const subject_name = req.body.subject_name;
  console.log(rollNumber);
  try {
    const subject = await prisma.subject.findFirst({
      where: {
        subject_name: subject_name,
      },
      select: {
        subject_id: true,
      },
    });
    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }
    console.log("subect id " + JSON.stringify(subject));
    const attendanceData = await prisma.userAttendance.findFirst({
      where: {
        roll_Number: rollNumber,
        subjectid: subject.subject_id,
      },
    });
    console.log("Attendence data " + JSON.stringify(attendanceData));
    if (!attendanceData) {
      return res.status(404).json({ message: "attendence data not found" });
    }

    const presentDays = attendanceData.present_Days;
    const totalDays = attendanceData.current_classes;
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
