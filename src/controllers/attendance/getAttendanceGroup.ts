import type { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import prisma from "../../db";
const getAttendanceByGroup = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const group = req.params.group;
  if (!group) {
    return next(createHttpError(400, "Please provide group"));
  }
  try {
    const attendanceDataByGroup = await prisma.userAttendance.findMany({
      where: {
        group: group,
      },
    });
    if (attendanceDataByGroup.length === 0) {
      return next(createHttpError(404, "Attendance data not found"));
    }
    return res.json({
      message: "Attendance data found",
      data: attendanceDataByGroup,
    });
  } catch (error) {
    next(createHttpError(500, "Internal Server Error"));
  }
};
export default getAttendanceByGroup;
