import prisma from "../../db";

import type { RequestHandler } from "express";

export const getCircularById: RequestHandler = async (req, res, next) => {
  const circularId = req.params.id;

  //   let resMessage = `Request to get Circular of ${circularId} was successfull.`;
  try {
    const circular = await prisma.circular.findUnique({
      where: {
        id: circularId,
      },
    });

    if (circular) {
      return res.status(200).json(circular);
    }

    return res.status(404);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};

export const getCircular: RequestHandler = async (req, res, next) => {
  const limit = Number(req.query.limit);
  const pageNum = Number(req.query.page);

  try {
    const circulars = await prisma.circular.findMany({
      take: limit > 1 ? limit : 1,
      skip: pageNum > 0 ? pageNum - 1 : 0,
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });

    res.status(200).json({
      circulars: circulars,
      pageNum: pageNum,
      records: limit,
    });
  } catch (err) {
    console.error(err);
    res.status(500);
  }
};
