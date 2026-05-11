import MasterPerusahaan from "../models/MasterPerusahaanModel.js";

export const getMasterPerusahaan = async (req, res) => {

  const response = await MasterPerusahaan.findAll();

  res.json(response);

};

export const createMasterPerusahaan = async (req, res) => {

  const response = await MasterPerusahaan.create(req.body);

  res.status(201).json(response);

};

export const deleteMasterPerusahaan = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await MasterPerusahaan.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Perusahaan tidak ditemukan",
      });
    }

    return res.json({
      message: "Perusahaan berhasil dihapus",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const updateMasterPerusahaan = async (req, res) => {
  try {
    const { id } = req.params;

    const perusahaan = await MasterPerusahaan.findByPk(id);

    if (!perusahaan) {
      return res.status(404).json({
        message: "Perusahaan tidak ditemukan",
      });
    }

    await perusahaan.update(req.body);

    const updated = await MasterPerusahaan.findByPk(id);

    return res.json({
      message: "Perusahaan berhasil diupdate",
      data: updated,
    });

  } catch (error) {
    console.log("ERROR UPDATE PERUSAHAAN:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};