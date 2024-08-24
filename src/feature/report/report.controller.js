import { filteredReportsRepo } from "./report.repository.js"

// function for filtering reports by status
export const filteredReports = async (req, res)=> {

    const reports = await filteredReportsRepo(req.params.status);
    if (reports.status) {
        return res.status(200).json({status: true, res: {msg: `Reports of all ${req.params.status} patients`, reports: reports.res}});
    } 
    return res.status(404).json({status: false, error: reports.errors})

}