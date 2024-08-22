import express from "express";
import { filteredReports } from "./report.controller.js";

const reportRouter = express.Router();

reportRouter.get("/:status", filteredReports)

export default reportRouter;