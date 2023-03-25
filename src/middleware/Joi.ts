import Joi, { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import { IEmployee } from "../models/Employee";
import { ILaptop } from "../models/Laptop";

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      console.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  employee: {
    create: Joi.object<IEmployee>({
      name: Joi.string().required(),
      campus: Joi.string().required(),
      empId: Joi.string().required(),
    }),
    allocate: Joi.object<IEmployee>({
      empId: Joi.string().required(),
      laptopId: Joi.string().required(),
    }),
  },
  laptop: {
    create: Joi.object<ILaptop>({
      model: Joi.string().required(),
      laptopId: Joi.string().required(),
      campus: Joi.string().required(),
    }),
    deAllocate: Joi.object<ILaptop>({
      laptopId: Joi.string().required(),
    }),
  },
};
