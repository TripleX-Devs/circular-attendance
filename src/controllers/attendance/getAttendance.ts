import type { NextFunction, Request, Response } from "express";
import prisma from "../../db";

const getAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const rollNumber = req.params.rollNumber;
  const subjectName = req.body.subjectName;

  if (!rollNumber) {
    return res.status(400).json({ message: "Please provide roll number" });
  }

  if (!subjectName) {
    return res.status(400).json({ message: "Please provide subject name" });
  }
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        rollNumber: rollNumber,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the subject
    const subject = await prisma.subject.findFirst({
      where: {
        subjectName: subjectName,
      },
      select: {
        subjectId: true,
      },
    });
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Find the attendance data
    const attendanceData = await prisma.userAttendance.findFirst({
      where: {
        rollNumber: rollNumber,
        subjectId: subject.subjectId,
      },
    });
    if (!attendanceData) {
      return res.status(404).json({ message: "Attendance data not found" });
    }

    const presentDays = attendanceData.presentDays;
    const totalDays = attendanceData.currentClasses;

    // Calculate the attendance percentage
    let percentage = 0;
    if (totalDays > 0) {
      percentage = (presentDays / totalDays) * 100;
    }

    return res.json({
      message: "Attendance data found",
      data: {
        presentDays: presentDays,
        totalDays: totalDays,
        percentage: percentage,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getAttendance;
