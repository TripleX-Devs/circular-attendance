import prisma from "../../db";

import type { RequestHandler, Response, NextFunction } from "express";
import { CustomRequest } from "@/validation/jwtVerify";

export const newCircular = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.rollType !== "teacher") {
    return res
      .status(403)
      .json({ message: "Forbidden: Only teachers can access this route" });
  }
  const { circularData } = req.body;

  try {
    const newCircular = await prisma.circular.create({
      data: {
        title: circularData.title,
        circularUrl: circularData.circularUrl,
        batch: circularData.batch,
        deleteAt: circularData.deleteAt,
      },
    });

    res.status(200).json(newCircular);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
