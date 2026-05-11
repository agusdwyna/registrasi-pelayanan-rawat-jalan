import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";



const Pasien = sequelize.define(
  "pasien",
  {
    namaLengkap: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 100],
        is: {
          args: /^[A-Za-z\s]+$/,
          msg: "Nama hanya boleh huruf dan spasi",
        },
      },
    },

    alamat: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    tempatLahir: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    tanggalLahir: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
      },
    },

    usia: {
      type: DataTypes.INTEGER,
    },

    nomorKTP: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
      validate: {
        len: [13, 13],
        isNumeric: true,
      },
    },

    jenisPenjamin: {
      type: DataTypes.ENUM(
        "PERSONAL",
        "JKN",
        "ASURANSI",
        "PERUSAHAAN"
      ),
      allowNull: false,
    },

    nomorJKN: {
      type: DataTypes.STRING(13),
      validate: {
        len: [13, 13],
      },
    },

    // 🔥 FOREIGN KEY FIELD (WAJIB ADA)
    layananId: {
      type: DataTypes.INTEGER,
    },

    dokterId: {
      type: DataTypes.INTEGER,
    },

    masterAsuransiId: {
      type: DataTypes.INTEGER,
    },

    masterPerusahaanId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTableName: true,
  }
);


export default Pasien;