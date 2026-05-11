import Pasien from "./PasienModel.js";
import Layanan from "./LayananModel.js";
import Dokter from "./DokterModel.js";
import MasterAsuransi from "./MasterAsuransiModel.js";
import MasterPerusahaan from "./MasterPerusahaanModel.js";

// PASIEN RELATION
Layanan.hasMany(Pasien, { foreignKey: "layananId" });
Pasien.belongsTo(Layanan, { foreignKey: "layananId" });

Dokter.hasMany(Pasien, { foreignKey: "dokterId" });
Pasien.belongsTo(Dokter, { foreignKey: "dokterId" });

MasterAsuransi.hasMany(Pasien, { foreignKey: "masterAsuransiId" });
Pasien.belongsTo(MasterAsuransi, { foreignKey: "masterAsuransiId" });

MasterPerusahaan.hasMany(Pasien, { foreignKey: "masterPerusahaanId" });
Pasien.belongsTo(MasterPerusahaan, { foreignKey: "masterPerusahaanId" });


Layanan.hasMany(Dokter, { foreignKey: "layananId" });
Dokter.belongsTo(Layanan, { foreignKey: "layananId" });

export default function initAssociations() {}