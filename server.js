import "./env.js"; // for loading environment veriable before anywhere in use
import express from "express";
import cookieParser from "cookie-parser";

import doctorRouter from "./src/feature/doctor/doctor.routes.js";
import patientRouter from "./src/feature/patients/patient.routes.js";
import reportRouter from "./src/feature/report/report.routes.js";
import { connectToMongoose } from "./src/config/mongoose.js";
import { jwtAuth } from "./src/middleware/jwt_auth.js";

const app = express();
const port = process.env.port;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/doctors', doctorRouter);
app.use('/api/patients', jwtAuth, patientRouter); // using JWT auth middlewre so that only doctors can register patients and create their report
app.use("/api/reports", jwtAuth, reportRouter);

// rest of all routes will reffer here
app.get('/', (req, res)=>{
    res.send('Welcome to Hospital Api')
})

app.listen(port, ()=>{
    console.log("server is listning on port", port);
    connectToMongoose();  
})