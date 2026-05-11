import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sequelize from "./config/Database.js";

import initAssociations from "./models/Associations.js";

initAssociations();
// ROUTES
import PasienRoute from "./routes/PasienRoute.js";
import LayananRoute from "./routes/LayananRoute.js";
import DokterRoute from "./routes/DokterRoute.js";
import MasterAsuransiRoute from "./routes/MasterAsuransiRoute.js";
import MasterPerusahaanRoute from "./routes/MasterPerusahaanRoute.js";


dotenv.config();

const app = express();

// MIDDLEWARE
app.use(cors({
  origin: process.env.CLIENT_ORIGIN,
  credentials: true
}));

app.use(express.json());

// API ROUTES
app.use(PasienRoute);
app.use(LayananRoute);
app.use(DokterRoute);
app.use(MasterAsuransiRoute);
app.use(MasterPerusahaanRoute);

app.get("/", (req, res) => {
  res.send("API Aktif");
});

// DATABASE CONNECTION
try {
  await sequelize.authenticate();
  console.log("Database Connected");

  await sequelize.sync();
  console.log("Database Synced");

} catch (error) {
  console.log("Database Error:", error);
}

// START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on http://localhost:${PORT}`);
});