import express from "express";

import {
  getMasterPerusahaan,
  createMasterPerusahaan,
  deleteMasterPerusahaan,
  updateMasterPerusahaan
} from "../controllers/MasterPerusahaanController.js";

const router = express.Router();

router.get("/master-perusahaan", getMasterPerusahaan);
router.post("/master-perusahaan", createMasterPerusahaan);
router.delete("/master-perusahaan/:id", deleteMasterPerusahaan);
router.put("/master-perusahaan/:id", updateMasterPerusahaan);


export default router;