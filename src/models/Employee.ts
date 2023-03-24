import mongoose, { Document, Schema } from 'mongoose';

export interface IEmployee {
    name: string;
    campus: string;
    laptopId: string;
    empId: string;
}

export interface IEmployeeModel extends IEmployee, Document {}

const EmployeeSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        campus: { type: String, required: true },
        empId: { type: String, required: true },
        laptopId: { type: String, required: false }
    },
    {
        versionKey: false
    }
);

export default mongoose.model<IEmployeeModel>('Employee', EmployeeSchema);
