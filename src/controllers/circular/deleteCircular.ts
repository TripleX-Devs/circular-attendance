import prisma from "../../db";

import type { RequestHandler } from "express";

export const deleteCircularById: RequestHandler = async (req, res, next) => {
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
