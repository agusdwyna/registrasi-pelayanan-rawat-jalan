import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";

const Layanan = sequelize.define(
  "layanan",
  {
    kodeLayanan: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    namaLayanan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Layanan;