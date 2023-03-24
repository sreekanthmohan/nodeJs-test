import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Employee from "../models/Employee";

const createEmployee = (req: Request, res: Response, next: NextFunction) => {
  const { id, name, campus, laptopId } = req.body;

  const employee = new Employee({
    _id: new mongoose.Types.ObjectId(),
    empId: id,
    name,
    campus,
    laptopId,
  });
  Employee.find({ empId: id }, (err, result) => {
    if (result && result.length) {
      return res.status(400).json({ message: "Employee already exists" });
    } else {
      return employee
        .save()
        .then((employee) => res.status(201).json({ employee }))
        .catch((error) => res.status(500).json({ error }));
    }
  });
};

export default { createEmployee };
