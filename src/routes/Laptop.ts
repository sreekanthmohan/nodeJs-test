import express from "express";
import controller from "../controllers/Laptop";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.post(
  "/create",
  ValidateJoi(Schemas.laptop.create),
  controller.createLaptop
);
router.post(
  "/allocate",
  ValidateJoi(Schemas.employee.allocate),
  controller.allocateLaptop
);
router.get(
  "/deAllocate/:laptopId",
  ValidateJoi(Schemas.laptop.deAllocate),
  controller.deAllocateLaptop
);
router.get("/ping", (req, res, next) =>
  res.status(200).json({ message: "pong" })
);

export = router;
