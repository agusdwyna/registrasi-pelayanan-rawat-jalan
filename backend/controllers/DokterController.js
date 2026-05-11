import Dokter from "../models/DokterModel.js";
import Layanan from "../models/LayananModel.js";

export const getDokter = async (req, res) => {

  const response = await Dokter.findAll({
    include: [Layanan],
  });
      console.log("=== DOKTER RESPONSE ===");
    console.log(JSON.stringify(response, null, 2));

  res.json(response);

};

export const createDokter = async (req, res) => {

  const response = await Dokter.create(req.body);

  res.status(201).json(response);

};

export const deleteDokter = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Dokter.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Dokter tidak ditemukan",
      });
    }

    return res.json({
      message: "Dokter berhasil dihapus",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateDokter = async (req, res) => {
  try {
    const { id } = req.params;

    const dokter = await Dokter.findByPk(id);

    if (!dokter) {
      return res.status(404).json({
        message: "Dokter tidak ditemukan",
      });
    }

    await Dokter.update(req.body, {
      where: { id },
    });

    const updated = await Dokter.findByPk(id, {
      include: [Layanan],
    });

    return res.json({
      message: "Dokter berhasil diupdate",
      data: updated,
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};