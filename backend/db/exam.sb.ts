import ExamModel from "./exam.model.db";

export const createExam = async (examData) => {
    try {
        return await ExamModel.create(examData);
    } catch (error) {
        console.error("Error creating exam:", error);
        throw new Error(`Error creating exam: ${error.message}`);
    }
};

export const findExamById = async (examId) => {
    try {
        return await ExamModel.findById(examId).exec();
    } catch (error) {
        console.error("Error finding exam by ID:", error);
        throw new Error(`Error finding exam by ID: ${error.message}`);
    }
};

export const findAllExams = async () => {
    try {
        return await ExamModel.find().exec();
    } catch (error) {
        console.error("Error finding all exams:", error);
        throw new Error(`Error finding all exams: ${error.message}`);
    }
};

export const updateExam = async (examId, updatedExamData, options) => {
    try {
        return await ExamModel.findByIdAndUpdate(examId, updatedExamData, options).exec();
    } catch (error) {
        console.error("Error updating exam:", error);
        throw new Error(`Error updating exam: ${error.message}`);
    }
};

export const deleteExam = async (examId) => {
    try {
        return await ExamModel.findByIdAndDelete(examId).exec();
    } catch (error) {
        console.error("Error deleting exam:", error);
        throw new Error(`Error deleting exam: ${error.message}`);
    }
};
