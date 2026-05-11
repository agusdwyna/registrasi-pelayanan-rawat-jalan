import express from "express";

import {
  getMasterAsuransi,
  createMasterAsuransi,
    deleteMasterAsuransi,   
    updateMasterAsuransi,
} from "../controllers/MasterAsuransiController.js";

const router = express.Router();

router.get("/master-asuransi", getMasterAsuransi);
router.post("/master-asuransi", createMasterAsuransi);
router.delete("/master-asuransi/:id", deleteMasterAsuransi);
router.put("/master-asuransi/:id", updateMasterAsuransi);

export default router;