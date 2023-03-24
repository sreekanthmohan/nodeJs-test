import express from "express";
import controller from "../controllers/Laptop";

const router = express.Router();

router.post("/create", controller.createLaptop);
router.post("/allocate", controller.allocateLaptop);
router.get("/deAllocate/:laptopId", controller.deAllocateLaptop);
router.get("/ping", (req, res, next) =>
  res.status(200).json({ message: "pong" })
);

export = router;
