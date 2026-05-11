import MasterAsuransi from "../models/MasterAsuransiModel.js";

export const getMasterAsuransi = async (req, res) => {

  const response = await MasterAsuransi.findAll();

  res.json(response);

};

export const createMasterAsuransi = async (req, res) => {

  const response = await MasterAsuransi.create(req.body);

  res.status(201).json(response);

};

export const deleteMasterAsuransi = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await MasterAsuransi.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({
        message: "Asuransi tidak ditemukan",
      });
    }

    return res.json({
      message: "Asuransi berhasil dihapus",
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const updateMasterAsuransi = async (req, res) => {
  try {
    const { id } = req.params;

    const asuransi = await MasterAsuransi.findByPk(id);

    if (!asuransi) {
      return res.status(404).json({
        message: "Asuransi tidak ditemukan",
      });
    }

    await asuransi.update(req.body);

    const updated = await MasterAsuransi.findByPk(id);

    return res.json({
      message: "Asuransi berhasil diupdate",
      data: updated,
    });

  } catch (error) {
    console.log("ERROR UPDATE ASURANSI:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};