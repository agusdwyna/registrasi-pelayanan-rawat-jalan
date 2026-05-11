import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Input from "../components/input";

export default function PasienForm() {
  const navigate = useNavigate();

  // =====================
  // STATE FORM
  // =====================
  const [form, setForm] = useState({
    namaLengkap: "",
    alamat: "",
    tempatLahir: "",
    tanggalLahir: "",
    nomorKTP: "",
    jenisPenjamin: "PERSONAL",
    nomorJKN: "",
    masterAsuransiId: "",
    masterPerusahaanId: "",
    layananId: "",
    dokterId: "",
  });

  // =====================
  // MASTER DATA
  // =====================
  const [master, setMaster] = useState({
    layanan: [],
    dokter: [],
    asuransi: [],
    perusahaan: [],
  });

  const [ktpError, setKtpError] = useState("");


  // =====================
  // LOAD MASTER (1X SAJA)
  // =====================
  useEffect(() => {
    const load = async () => {
      try {


        const [l, d, a, p] = await Promise.all([
          api.get("/layanan"),
          api.get("/dokter"),
          api.get("/master-asuransi"),
          api.get("/master-perusahaan"),
        ]);

        setMaster({
          layanan: l.data || [],
          dokter: d.data || [],
          asuransi: a.data || [],
          perusahaan: p.data || [],
        });
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, []);

  // =====================
  // DERIVED DATA (NO useEffect)
  // =====================
  const filteredDokter = useMemo(() => {
    if (!form.layananId) return [];
    return master.dokter.filter(
      (d) => d.layananId === Number(form.layananId)
    );
  }, [form.layananId, master.dokter]);

  // =====================
  // KTP CHECK (debounce ringan optional)
  // =====================
  const checkKTP = async () => {
    if (!form.nomorKTP) return;

    try {
      const res = await api.get("/pasien");
      const exist = res.data.find(
        (p) => p.nomorKTP === form.nomorKTP
      );

      setKtpError(exist ? "KTP sudah terdaftar" : "");
    } catch (err) {
      console.error(err);
    }
  };

  // =====================
  // HANDLE INPUT
  // =====================
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // =====================
  // VALIDASI UMUR
  // =====================
  const handleDOB = (value) => {
    const today = new Date();
    const birth = new Date(value);

    if (birth > today) return alert("Tanggal tidak valid");

    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    if (age < 0) return alert("Umur tidak valid");

    handleChange("tanggalLahir", value);
  };

  // =====================
  // SUBMIT
  // =====================
  const submit = async () => {
    if (form.namaLengkap.length < 3)
      return alert("Nama minimal 3 karakter");

    if (!form.layananId || !form.dokterId)
      return alert("Layanan & Dokter wajib");

    if (!form.alamat || !form.tempatLahir)
      return alert("Data wajib lengkap");

    if (ktpError)
      return alert("KTP sudah terdaftar");

    const payload = {
      ...form,
      layananId: Number(form.layananId),
      dokterId: Number(form.dokterId),
      masterAsuransiId: form.masterAsuransiId
        ? Number(form.masterAsuransiId)
        : null,
      masterPerusahaanId: form.masterPerusahaanId
        ? Number(form.masterPerusahaanId)
        : null,
    };

    try {
      await api.post("/pasien", payload);
      alert("Berhasil daftar");
    } catch (err) {
        console.error(err);
        alert("Terjadi kesalahan");
        }
  };

  // =====================
  // UI STYLE
  // =====================
  const card =
    "bg-white/80 backdrop-blur border rounded-2xl p-6 shadow-sm";

  return (
    <div className="min-h-screen bg-gray-50 p-6 relative">

      {/* NAV ADMIN */}
      <button
        onClick={() => navigate("/admin")}
        className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-xl"
      >
        Admin
      </button>

      <div className="max-w-4xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">
            Registrasi Pasien
          </h1>
        </div>

        {/* FORM PASIEN */}
        <div className={card}>
          <h2 className="font-semibold mb-4">Data Pasien</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Nama"
              value={form.namaLengkap}
              onChange={(e) =>
                handleChange("namaLengkap", e.target.value)
              }
            />

            <Input
              label="KTP"
              value={form.nomorKTP}
              onChange={(e) =>
                handleChange("nomorKTP", e.target.value)
              }
              onBlur={checkKTP}
              error={ktpError}
            />

            <Input
              label="Tempat Lahir"
              value={form.tempatLahir}
              onChange={(e) =>
                handleChange("tempatLahir", e.target.value)
              }
            />

            <Input
              type="date"
              label="Tanggal Lahir"
              value={form.tanggalLahir}
              onChange={(e) => handleDOB(e.target.value)}
            />
          </div>
        </div>

        {/* PENJAMIN */}
        <div className={card}>
          <h2 className="font-semibold mb-4">Penjamin</h2>

          <select
            className="w-full border p-3 rounded-xl mb-4"
            value={form.jenisPenjamin}
            onChange={(e) =>
              handleChange("jenisPenjamin", e.target.value)
            }
          >
            <option value="PERSONAL">PERSONAL</option>
            <option value="JKN">JKN</option>
            <option value="ASURANSI">ASURANSI</option>
            <option value="PERUSAHAAN">PERUSAHAAN</option>
          </select>

          {form.jenisPenjamin === "ASURANSI" && (
            <select
              className="w-full border p-3 rounded-xl"
              value={form.masterAsuransiId}
              onChange={(e) =>
                handleChange("masterAsuransiId", e.target.value)
              }
            >
              <option value="">Pilih Asuransi</option>
              {master.asuransi.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.namaAsuransi}
                </option>
              ))}
            </select>
          )}

          {form.jenisPenjamin === "PERUSAHAAN" && (
            <select
              className="w-full border p-3 rounded-xl"
              value={form.masterPerusahaanId}
              onChange={(e) =>
                handleChange("masterPerusahaanId", e.target.value)
              }
            >
              <option value="">Pilih Perusahaan</option>
              {master.perusahaan.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.namaPerusahaan}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* LAYANAN & DOKTER */}
        <div className={card}>
          <h2 className="font-semibold mb-4">
            Layanan & Dokter
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="border p-3 rounded-xl"
              value={form.layananId}
              onChange={(e) => {
                handleChange("layananId", e.target.value);
                handleChange("dokterId", "");
              }}
            >
              <option value="">Pilih Layanan</option>
              {master.layanan.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.namaLayanan}
                </option>
              ))}
            </select>

            <select
              className="border p-3 rounded-xl"
              value={form.dokterId}
              onChange={(e) =>
                handleChange("dokterId", e.target.value)
              }
              disabled={!form.layananId}
            >
              <option value="">Pilih Dokter</option>
              {filteredDokter.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.namaDokter}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          onClick={submit}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Simpan
        </button>
      </div>
    </div>
  );
}