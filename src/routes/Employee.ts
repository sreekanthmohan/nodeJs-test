import express from "express";
import controller from "../controllers/Employee";
import { Schemas, ValidateJoi } from "../middleware/Joi";

const router = express.Router();

router.post(
  "/create",
  ValidateJoi(Schemas.employee.create),
  controller.createEmployee
);
// router.post("/create", controller.createEmployee);

export = router;
