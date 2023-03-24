import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Laptop from "../models/Laptop";
import Employee from "../models/Employee";

const createLaptop = (req: Request, res: Response, next: NextFunction) => {
  const { id, campus, model } = req.body;

  const laptop = new Laptop({
    _id: new mongoose.Types.ObjectId(),
    laptopId: id,
    campus,
    model,
  });
  Laptop.find({ laptopId: id })
    .then((result) => {
      if (result && result.length) {
        return res.status(404).json({ message: "Laptop already exists" });
      } else {
        return laptop
          .save()
          .then((laptop) => res.status(201).json({ laptop }))
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ error }));
};

const allocateLaptop = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { lapId, empId } = req.body;
  if (!lapId || !empId) {
    return res.status(400).json({ message: "Empty lap/emp id" });
  }
  const pro1 = await Laptop.findOne({ laptopId: lapId });
  const pro2 = await Employee.findOne({ empId: empId });
  if (pro1 && pro2) {
    if (pro1.campus !== pro2.campus) {
      return res.status(400).json({ message: "campus is different" });
    }
  } else {
    return res.status(400).json({ message: "Invalid employee/laptop id" });
  }

  Employee.find({ laptopId: lapId }).then((result) => {
    if (result && result.length) {
      return res.status(400).json({ message: "Laptop already assigned" });
    } else {
      pro2.laptopId = lapId;
      return pro2
        .save()
        .then((emp: any) => res.status(201).json({ emp }))
        .catch((error: any) => res.status(500).json({ error }));
    }
  });
};

const deAllocateLaptop = (req: Request, res: Response, next: NextFunction) => {
  const { laptopId } = req.params;
  if (!laptopId) {
    return res.status(400).json({ message: "Empty laptop id" });
  }
  Employee.findOne({ laptopId }).then((empInfo) => {
    if (!empInfo) {
      return res
        .status(400)
        .json({ message: "Laptop not mapped to any employees" });
    } else {
      empInfo.laptopId = "";
      return empInfo
        .save()
        .then((emp: any) => res.status(201).json({ emp }))
        .catch((error: any) => res.status(500).json({ error }));
    }
  });
};

export default { createLaptop, allocateLaptop, deAllocateLaptop };
