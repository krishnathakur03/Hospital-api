import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { loginDoctorRepo, registerDoctorRepo } from "./doctor.repository.js"
import { doctorSchema } from "./doctor.schema.js";

const DoctorModel = mongoose.model("Doctor", doctorSchema);
const JWT_SECRET = process.env.SECRET;

// function for registering doctors
export const registerDoctor = async (req, res) => {
    
    let { password } = req.body;
    if (password.length > 0) {
        password = await bcrypt.hash(password, 12); // use bcrypt for hash password to maintain privacy
    }
    
    // send data and hash password to doctorRepository
    const doctor = await registerDoctorRepo({...req.body, password});
    if (doctor.status) {
        res.status(201).json({status: true, res: {msg: "Doctor registration successfully", doctor: doctor.data }})
    } else {
        res.status(500).json({status: false, error: doctor.errors})
    }
}

// fuction for login in doctors
export const loginDoctor = async (req, res) => {
    
    const { phone } = req.body;
    const doctor = await DoctorModel.findOne({phone});

    // if doctor is found then check password else return
    if (doctor) {
        const resp = await loginDoctorRepo(req.body);
        if (resp.status) {
            const jwtToken = jwt.sign({doctorId: doctor._id}, JWT_SECRET,  {expiresIn: '1h'});

            // set jwt Token to cookies for save login's
            res.cookie("jwtToken", jwtToken, { maxAge: 1*60*60*1000 })
            return res.status(200).json({status: true, res: {msg: "Login successfully",token: jwtToken}})
        } else {
            return res.status(401).json({status: false, error: resp.errors})
        }
    } else {
        return res.status(401).json({status: false, error: "Invalid phone number"})
    }

}