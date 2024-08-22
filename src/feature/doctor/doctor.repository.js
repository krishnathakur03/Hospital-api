import mongoose from "mongoose";
import { doctorSchema } from "./doctor.schema.js";
import bcrypt from "bcrypt";

const DoctorModel = mongoose.model("Doctor", doctorSchema);

// doctor's registration function
export const registerDoctorRepo = async (data) => {
    try {

        // registering new doctor
        const doctor = new DoctorModel(data);
        await doctor.save();

        return {status: true, data: doctor};
        
    } catch (error) {
        console.log("Error in register of doctor", error);
        
        // if phone number is not unique or already register then return this error
        if (error.name === "MongoServerError" && error.code == 11000) {
            return {status : false, errors: "this phone number is already register please check again"}
        }
        return {status: false, errors: Object.values(error.errors).map(err=> err.message)};
    }
}

export const loginDoctorRepo = async (data) =>{
    try {
        
        const doctor = await DoctorModel.findOne({phone: data.phone});
        const result = await bcrypt.compare(data.password, doctor.password); // compare password with hash password

        // if password match then return doctor's object else return error 
        if (result) {
            return {status: true, data: doctor}
        } else {
            return {status: false, errors: "password does not match"}
        }

    } catch (error) {
        console.log("Error in logging doctor", error);
        return {status: false, errors: "something went wrong please try again later"}
    }
}