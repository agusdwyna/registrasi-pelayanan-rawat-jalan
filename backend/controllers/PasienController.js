import Pasien from "../models/PasienModel.js";

import Dokter from "../models/DokterModel.js";
import Layanan from "../models/LayananModel.js";

import MasterAsuransi from "../models/MasterAsuransiModel.js";
import MasterPerusahaan from "../models/MasterPerusahaanModel.js";

export const createPasien = async (req, res) => {
  try {

    const data = req.body;

    // HITUNG USIA
    const lahir = new Date(data.tanggalLahir);

    const today = new Date();

    let usia = today.getFullYear() - lahir.getFullYear();

    const month = today.getMonth() - lahir.getMonth();

    if (
      month < 0 ||
      (month === 0 && today.getDate() < lahir.getDate())
    ) {
      usia--;
    }

    data.usia = usia;

    // VALIDASI JKN
    if (data.jenisPenjamin === "JKN") {

      if (!data.nomorJKN) {
        return res.status(400).json({
          message: "Nomor JKN wajib diisi",
        });
      }

      if (data.nomorJKN.length !== 13) {
        return res.status(400).json({
          message: "Nomor JKN harus 13 digit",
        });
      }

    }

    // VALIDASI ASURANSI
    if (data.jenisPenjamin === "ASURANSI") {

      if (!data.masterAsuransiId) {
        return res.status(400).json({
          message: "Asuransi wajib dipilih",
        });
      }

    }

    // VALIDASI PERUSAHAAN
    if (data.jenisPenjamin === "PERUSAHAAN") {

      if (!data.masterPerusahaanId) {
        return res.status(400).json({
          message: "Perusahaan wajib dipilih",
        });
      }

    }

    const pasien = await Pasien.create(data);

    res.status(201).json(pasien);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getPasien = async (req, res) => {
  try {

    const response = await Pasien.findAll({
      include: [
        Dokter,
        Layanan,
        MasterAsuransi,
        MasterPerusahaan,
      ],
    });

    res.json(response);

  } catch (error) {

    res.json({
      message: error.message,
    });

  }
};
export const deletePasien = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Pasien.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Pasien tidak ditemukan",
      });
    }

    return res.json({
      message: "Pasien berhasil dihapus",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};