import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Employee from "../models/Employee";

const createEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { empId, name, campus } = req.body;
  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    empId,
    name,
    campus,
    laptopId: "",
  });
  return Employee.findOne({ empId: empId })
    .then((result) => {
      if (result) {
        return res.status(400).json({ message: "Employee already exists" });
      } else {
        return employee
          .save()
          .then((employee) => res.status(201).json({ employee }))
          .catch((error) => res.status(500).json({ error }));
      }
    })
    .catch((error) => res.status(500).json({ dd: error }));
};

export default { createEmployee };
