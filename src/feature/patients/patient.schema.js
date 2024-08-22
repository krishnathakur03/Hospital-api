import mongoose from "mongoose";

// setting up schema for patients
export const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    phone: {
        type: Number,
        required: [true, "phone number is required"],
        unique: true,
        validate: {
            validator: function (val) {
                return val > 1000000000 && val <= 9999999999; // phone number can only be 10 digits
            },
            message: "phone number must contain 10 digits"
        }
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report"
    }]
})