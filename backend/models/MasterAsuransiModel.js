import { DataTypes } from "sequelize";

import sequelize from "../config/Database.js";

const MasterAsuransi = sequelize.define(
  "master_asuransi",
  {
    kodeAsuransi: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    namaAsuransi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default MasterAsuransi;