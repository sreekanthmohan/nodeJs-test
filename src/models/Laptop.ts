import mongoose, { Document, Schema } from "mongoose";

export interface ILaptop {
  model: string;
  laptopId: string;
  campus: string;
}

export interface ILaptopModel extends ILaptop, Document {}

const LaptopSchema: Schema = new Schema(
  {
    model: { type: String, required: true },
    laptopId: { type: String, required: true },
    campus: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<ILaptopModel>("Laptop", LaptopSchema);
