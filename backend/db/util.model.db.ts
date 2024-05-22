import mongoose from "mongoose";


const DB_URL = "mongodb://127.0.0.1:27017/testhelper_db"

export const initMongoConnect = async () => {
    await mongoose.connect(DB_URL);
}