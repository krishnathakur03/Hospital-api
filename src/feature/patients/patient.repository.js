import mongoose from "mongoose"
import { ObjectId } from "mongodb";
import { patientSchema } from "./patient.schema.js"
import { reportSchema } from "../report/report.schema.js";


const PatientModel = mongoose.model("Patient", patientSchema);
const ReportModel = mongoose.model("Report", reportSchema)

// function for registering patient
export const patientRegisterRepo = async (data) =>{

    try {
        const patient = new PatientModel(data);
        await patient.save();
    
        return {status: true, res: patient};
        
    } catch (error) {
        console.log("Error in patient registration", error);
        return {status: false, errors: Object.values(error.errors).map(err=> err.message)}
    }
}

// function for create report
export const createReportRepo = async (data) =>{

    try {
        const patient = await PatientModel.findById(data.patient);
        
        if (patient) {
            const report = new ReportModel(data);
            await report.save();

            // pushing report id in patient reports array
            patient.reports.push(report._id);
            await patient.save()

            return {status: true, res: report};
        } else {
            return {status: false, errors: "Patient did not found"};
        }
        
    } catch (error) {
        console.log("Error in creating new report", error);
        return {status: false, errors: Object.values(error.errors).map(err=> err.message)}
    }
}

// function for getting reports of a patient
export const reportsRepo = async (patientId)=> {

    try {
        const reports = await ReportModel.find({patient: new ObjectId(patientId)});
        // if reports is present of this patient than return reports
        if (reports) {
            return {status: true, res: reports}
        } else {
            return {status: false, errors: "No report found for this patient"}
        }
        
    } catch (error) {
        console.log("Error in getting report of a patient", error);
        return {status: false, errors: Object.values(error.errors).map(err => err.message)}
    }
}