import mongoose from "mongoose"
import { reportSchema } from "./report.schema.js"

const ReportModel = mongoose.model("Report", reportSchema);

// function for filtering reports with specific status
export const filteredReportsRepo = async (status)=> {

    try {
        const filteredReport = await ReportModel.find({status}).populate('patient');
    
        if (filteredReport) {
            return {status: true, res: filteredReport}
        } else {
            return {status: false, errors: "No report found with this status"}
        }
    } catch (error) {
        console.log(error);
        return {status: false, errors: error}
    }

}