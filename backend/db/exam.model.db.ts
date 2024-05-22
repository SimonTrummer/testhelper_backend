import mongoose from "mongoose";
import { IExam } from "../common/models/IExam";
import { IMaterial } from "../common/models/IMaterial";
import { IPDFFile } from "../common/models/IPDF";

// Schemas
const PDFFileSchema = new mongoose.Schema<IPDFFile>({
    data: Buffer,
    contentType: String,
    filename: String,
});

const MaterialSchema = new mongoose.Schema<IMaterial>({
    id: Number,
    file: PDFFileSchema,
    title: String,
});

const ExamSchema = new mongoose.Schema<IExam>({
    date: Date,
    id: Number,
    difficulty_rating: Number,
    type: String,
    subject: String,
    materials: [MaterialSchema],
});

const ExamModel = mongoose.model<IExam>('Exam', ExamSchema);

const ExamDB = {
    create: async (examData: {
        date: Date;
        difficulty_rating: number;
        materials: { file: { filename: string; data: Buffer; contentType: string }; id: number; title: string }[];
        subject: string;
        id: number;
        type: string
    }) => {
        try {
            const exam = await ExamModel.create(examData);
            return exam;
        } catch (error) {
            throw new Error(`Error creating exam: ${error}`);
        }
    },

    findById: async (examId: string) => {
        try {
            const exam = await ExamModel.findById(examId).exec();
            return exam;
        } catch (error) {
            throw new Error(`Error finding exam by ID: ${error}`);
        }
    },

    findAll: async () => {
        try {
            const exams = await ExamModel.find().exec();
            return exams;
        } catch (error) {
            throw new Error(`Error finding all exams: ${error}`);
        }
    },

    update: async (examId: string, body: ReqBody, p: { new: boolean }) => {
        try {
            const exam = await ExamModel.findByIdAndUpdate(examId, updatedExamData, { new: true }).exec();
            return exam;
        } catch (error) {
            throw new Error(`Error updating exam: ${error}`);
        }
    },

    delete: async (examId: string) => {
        try {
            const deletedExam = await ExamModel.findByIdAndDelete(examId).exec();
            return deletedExam;
        } catch (error) {
            throw new Error(`Error deleting exam: ${error}`);
        }
    },
};

export default ExamDB;
