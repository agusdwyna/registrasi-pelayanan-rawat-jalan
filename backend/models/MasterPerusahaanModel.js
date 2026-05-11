import { DataTypes } from "sequelize";

import sequelize from "../config/Database.js";

const MasterPerusahaan = sequelize.define(
  "master_perusahaan",
  {
    kodePerusahaan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    namaPerusahaan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default MasterPerusahaan;