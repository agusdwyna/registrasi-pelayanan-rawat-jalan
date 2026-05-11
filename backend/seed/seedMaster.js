import sequelize from "../config/Database.js";

import MasterAsuransi from "../models/MasterAsuransiModel.js";
import MasterPerusahaan from "../models/MasterPerusahaanModel.js";

await sequelize.sync();

await MasterAsuransi.bulkCreate([
  {
    kodeAsuransi: "AS001",
    namaAsuransi: "Allianz",
  },
  {
    kodeAsuransi: "AS002",
    namaAsuransi: "Prudential",
  },
  {
    kodeAsuransi: "AS003",
    namaAsuransi: "SequisLife",
  },
]);

await MasterPerusahaan.bulkCreate([
  {
    kodePerusahaan: "PR001",
    namaPerusahaan: "PLN",
  },
  {
    kodePerusahaan: "PR002",
    namaPerusahaan: "Telkom",
  },
]);

console.log("Seeder berhasil");