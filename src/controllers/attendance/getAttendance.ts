import { NextFunction, Request, Response } from "express";
import prisma from "../../db";
import createHttpError from "http-errors";
import { date } from "zod";

const getAttendance = async (req:Request, res:Response,next:NextFunction) => {
  if(!req.params.roll_Number){
    return next(createHttpError(400, 'Please provide roll number'));
  }
  const rollNumber = req.params.roll_Number;
  try { 
    const attendanceData = await prisma.userAttendance.findFirst({
     where : {
        roll_Number : rollNumber 
     }
    });

    if(!attendanceData){
      return next(createHttpError(404, 'Attendance data not found'));
    }

    const presentDays = attendanceData.present_Days;
    const totalDays = attendanceData.current_classes;
    const percentage = (presentDays/totalDays) * 100;
    if(presentDays === 0 && totalDays === 0){
      return res.json({
        message: 'Attendance data found',
        data: {
          presentDays: presentDays,
          totalDays: totalDays,
          percentage: 0
        }
      });
    }
    return res.json({
      date:{
        presentDays: presentDays,
        totalDays: totalDays,
        percentage: percentage
      }
    }) 
  } catch (error) {
    next(createHttpError(500 , 'Internal Server Error'));
  }
};
export  default getAttendance;