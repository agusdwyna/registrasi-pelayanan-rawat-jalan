import express from "express";

import {
  createPasien,
  getPasien, deletePasien
} from "../controllers/PasienController.js";

const router = express.Router();

router.get("/pasien", getPasien);
router.post("/pasien", createPasien);
router.delete("/pasien/:id", deletePasien);

export default router;