import type { NextFunction, Request, Response } from "express";
import prisma from "../../db";
import createHttpError from "http-errors";

const getAttendance = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.params.roll_Number) {
    return next(createHttpError(400, "Please provide roll number"));
  }
  const rollNumber = req.params.roll_Number;
  const subject_name = req.body.subject_name;
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
      return next(createHttpError(404, "Subject not found"));
    }
    const attendanceData = await prisma.userAttendance.findFirst({
      where: {
        roll_Number: rollNumber,
        subjectid: subject.subject_id,
      },
    });
    if (!attendanceData) {
      return next(createHttpError(404, "Attendance data not found"));
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
    next(createHttpError(500, "Internal Server Error"));
  }
};
export default getAttendance;
