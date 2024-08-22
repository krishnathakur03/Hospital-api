import mongoose from "mongoose";
import { patientSchema } from "./patient.schema.js";
import { createReportRepo, patientRegisterRepo, reportsRepo } from "./patient.repository.js";


const PatientModel = mongoose.model('Patient', patientSchema);

// function for registering patients
export const patientRegister = async (req, res)=> {

    const { phone } = req.body;

    let patient = await PatientModel.findOne({phone});
    // checking if this phone number already register or not
    if (patient) {
        // patient is already register then return instance
        return res.status(200).json({status: true, res: {msg: "Patient has already been register", patient: patient}})
    }
    
    // if not register then register new patient
    patient = await patientRegisterRepo (req.body);
    if (patient.status) {
        return res.status(201).json({status: true, res: {mas: "Patient register successfully", patient: patient.res}});
    }
    return res.status(401).json({status: false, error: patient.errors});
}

// function for creating new report for patients
export const createReport = async (req, res)=> {
    const patientId = req.params.id;
    const doctorId = req.doctorId;

    const report = await createReportRepo({patient: patientId, doctor: doctorId, ...req.body});
    if(report.status){
        return res.status(201).json({status: true, res: {msg: "Report is created", res: report.res}})
    }

    return res.status(401).json({status: false, error: report.errors})
}

// function for getting all reports of a specific patient
export const allReports = async (req, res) => {
    const patientId = req.params.id;

    const reports = await reportsRepo(patientId);
    if(reports.status) {
        return res.status(200).json({status: true, res: {msg: "All reports are here", res: reports.res}})
    }
    return res.status(404).json({status: false, error: reports.errors})
}