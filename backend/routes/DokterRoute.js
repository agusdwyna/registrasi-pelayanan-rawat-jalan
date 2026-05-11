import express from "express";

import {
  getDokter,
  createDokter,
    deleteDokter,
    updateDokter
} from "../controllers/DokterController.js";

const router = express.Router();

router.get("/dokter", getDokter);
router.post("/dokter", createDokter);
router.delete("/dokter/:id", deleteDokter);
router.put("/dokter/:id", updateDokter);

export default router;