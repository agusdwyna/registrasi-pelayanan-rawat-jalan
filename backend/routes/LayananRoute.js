import express from "express";

import {
  getLayanan,
  createLayanan,
  deleteLayanan,
  updateLayanan,
} from "../controllers/LayananController.js";

const router = express.Router();

router.get("/layanan", getLayanan);
router.post("/layanan", createLayanan);
router.delete("/layanan/:id", deleteLayanan);
router.put("/layanan/:id", updateLayanan);

export default router;