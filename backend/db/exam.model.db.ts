import mongoose from "mongoose";
import { IExam } from "../common/models/IExam";
import { IMaterial } from "../common/models/IMaterial";
import { IPDFFile } from "../common/models/IPDF";

// Schemas
const PDFFileSchema = new mongoose.Schema<IPDFFile>({
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    filename: { type: String, required: true },
});

const MaterialSchema = new mongoose.Schema<IMaterial>({
    id: { type: Number, required: true },
    file: { type: PDFFileSchema, required: true },
    title: { type: String, required: true },
});

const ExamSchema = new mongoose.Schema<IExam>({
    date: { type: Date, required: true },
    id: { type: Number, required: true, unique: true },
    difficulty_rating: { type: Number, required: true },
    type: { type: String, required: true },
    subject: { type: String, required: true },
    materials: { type: [MaterialSchema], required: true },
});

const ExamModel = mongoose.model<IExam>('Exam', ExamSchema);



export default ExamModel;
