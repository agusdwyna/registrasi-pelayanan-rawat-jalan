import { useEffect, useState, useRef } from "react";
import api from "../api/api";

export default function PasienPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const didFetch = useRef(false);

  // ======================
  // LOAD DATA
  // ======================
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/pasien");
      setData(res.data || []);
    } catch (err) {
      console.error("LOAD PASIEN ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    load();
  }, []);

  // ======================
  // HITUNG UMUR (FRONTEND)
  // ======================
  const hitungUmur = (tanggalLahir) => {
    if (!tanggalLahir) return "-";

    const today = new Date();
    const birth = new Date(tanggalLahir);

    let age = today.getFullYear() - birth.getFullYear();

    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }

    return age;
  };

  // ======================
  // DELETE
  // ======================
  const hapus = async (id) => {
    try {
      await api.delete(`/pasien/${id}`);
      load();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="space-y-4">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Pasien</h1>

        {loading && (
          <span className="text-sm text-gray-500">
            Loading...
          </span>
        )}
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">KTP</th>
              <th className="p-3 text-left">Tempat Lahir</th>
              <th className="p-3 text-left">Tanggal Lahir</th>
              <th className="p-3 text-left">Umur</th>
              <th className="p-3 text-center">Jenis Penjamin</th>
              <th className="p-3 text-center">Poli Layanan</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((p) => (
                <tr key={p.id} className="border-t">

                  <td className="p-3 font-medium">
                    {p.namaLengkap}
                  </td>

                  <td className="p-3">
                    {p.nomorKTP}
                  </td>

                  <td className="p-3">
                    {p.tempatLahir}
                  </td>

                  <td className="p-3">
                    {p.tanggalLahir}
                  </td>



                  {/* 🔥 UMUR AUTO HITUNG DI FRONTEND */}
                  <td className="p-3 font-semibold text-blue-600">
                    {hitungUmur(p.tanggalLahir)} tahun
                  </td>
                  
                  <td className="p-3">
                    {p.jenisPenjamin}
                  </td>

                   <td className="p-3">
                    {p.layanan ? p.layanan.namaLayanan : "-"}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => hapus(p.id)}
                      className="text-red-500"
                    >
                      Hapus
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}