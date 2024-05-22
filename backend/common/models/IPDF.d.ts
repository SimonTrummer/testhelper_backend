import mongoose from "mongoose";

export interface IPDFFile extends mongoose.Document {
    data: Buffer,
    contentType: string,
    filename: string,
}