import { DataTypes } from "sequelize";

import sequelize from "../config/Database.js";


const Dokter = sequelize.define(
  "dokter",
  {
    kodeDokter: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    namaDokter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Dokter;