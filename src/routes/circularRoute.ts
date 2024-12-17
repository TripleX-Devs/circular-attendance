import { checkForAccessToken } from "@/validation/jwtVerify";
import * as circularControllers from "../controllers/circular";

import { Router } from "express";

const router = Router();

router.get("/:id", checkForAccessToken, circularControllers.getCircularById);
router.get("/", checkForAccessToken,circularControllers.getCircular);

router.post("/", checkForAccessToken,circularControllers.newCircular);

router.delete("/:id",checkForAccessToken, circularControllers.deleteCircularById);

export default router;
