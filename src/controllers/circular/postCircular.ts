import prisma from "@/db";

import type { RequestHandler } from "express";

export const newCircular: RequestHandler = async (req, res, next) => {
  const { circularData } = req.body;

  try {
    const newCircular = prisma.circular.create({
      data: { ...circularData },
    });

    res.status(200).json(newCircular);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
