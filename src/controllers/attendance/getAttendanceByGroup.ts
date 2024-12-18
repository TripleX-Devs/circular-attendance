import type { Response } from 'express';
import prisma from "../../db";
import { CustomRequest } from '../../validation/jwtVerify';

const getAttendanceByGroup = async (req: CustomRequest, res: Response) => {
  if (req.user?.rollType !== "teacher") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only teachers can access this route" });
  }

  const group = req.params.group;

  try {
    const data = await prisma.userAttendance.findMany({
      where: {
        user: {
          group: group
        }
      },
      include: {
        user: true
      }
    });

    const result = data.map((attendance) => {
      const presentDays = attendance.presentDays;
      const totalDays = attendance.currentClasses;
      const percentage = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;

      return {
        rollNumber: attendance.rollNumber,
        name: attendance.user.name,
        group: attendance.user.group,
        presentDays: presentDays,
        totalDays: totalDays,
        percentage: percentage,
        subjectId: attendance.subjectId,
        absentDays: attendance.absentDays,
        currentClasses: attendance.currentClasses,
      };
    });

    res.json({ message: "Attendance fetched by group successfully", data: result });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export default getAttendanceByGroup;