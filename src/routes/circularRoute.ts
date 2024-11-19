import * as circularControllers from "@/controllers/circular";

import { Router } from "express";

const router = Router();

router.get("/:id", circularControllers.getCircularById);
router.get("/", circularControllers.getCircular);

router.post("/", circularControllers.newCircular);

router.delete("/:id", circularControllers.deleteCircularById);

export default router;
