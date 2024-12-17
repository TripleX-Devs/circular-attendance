import prisma from "../../db";

import type {  Response , NextFunction } from "express";
import { CustomRequest } from "@/validation/jwtVerify";

export const deleteCircularById = async (req : CustomRequest, res : Response, next : NextFunction) => {
  if (req.user?.rollType !== "teacher") {
    return res.status(403).json({ message: "Forbidden: Only teachers can access this route" });
  }
  const circularId = req.params.circularId;

  //   let resMessage = `Request to delete Circular of ${circularId} was successfull.`;
  try {
    const circular = await prisma.circular.delete({
      where: {
        id: circularId,
      },
    });

    res.status(200).json(circular);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
