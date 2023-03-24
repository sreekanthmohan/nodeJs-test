import express from "express";
import controller from "../controllers/Employee";

const router = express.Router();

router.post("/create", controller.createEmployee);

export = router;
