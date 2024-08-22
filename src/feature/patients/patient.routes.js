import express from "express";
import { allReports, createReport, patientRegister } from "./patient.controller.js";

const patientRouter = express.Router();

patientRouter.post("/register", patientRegister);
patientRouter.post("/:id/create_report", createReport);
patientRouter.get("/:id/all_reports", allReports);

export default patientRouter;