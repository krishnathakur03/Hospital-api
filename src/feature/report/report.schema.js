import mongoose from "mongoose";

// setting up schema for reports
export const reportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    },
    status: {
        type: String,
        enum: ["negative", "travelled-quarantine", "symptoms-quarantine", "positive-admit"], // only these four status is allowed
        required: true
    },
    date: {
        type: String,
        default: new Date().toLocaleDateString()
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    }
});