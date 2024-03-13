import express from "express";
import cors from "cors";
import patientsRouter from "./src/routes/patients.routes";
import diagnosesRouter from "./src/routes/diagnoses.routes";
const app = express();
app.use(express.json());
app.use(cors());


const PORT = 3003;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/patients", patientsRouter);
app.use("/api/diagnoses", diagnosesRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/api/patients`);
});