import Layanan from "../models/LayananModel.js";

export const getLayanan = async (req, res) => {

  const response = await Layanan.findAll();

  res.json(response);

};

export const createLayanan = async (req, res) => {

  const response = await Layanan.create(req.body);

  res.status(201).json(response);

};


export const deleteLayanan = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Layanan.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Layanan tidak ditemukan",
      });
    }

    return res.json({
      message: "Layanan berhasil dihapus",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateLayanan = async (req, res) => {
  try {
    const { id } = req.params;

    const layanan = await Layanan.findByPk(id);

    if (!layanan) {
      return res.status(404).json({
        message: "Layanan tidak ditemukan",
      });
    }

    await layanan.update(req.body);

    const updated = await Layanan.findByPk(id);

    return res.json({
      message: "Layanan berhasil diupdate",
      data: updated,
    });

  } catch (error) {
    console.log("UPDATE LAYANAN ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};