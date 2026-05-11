import { useEffect, useState, useRef } from "react";
import api from "../api/api";

export default function DokterPage() {
  const [data, setData] = useState([]);
  const [layanan, setLayanan] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    kodeDokter: "",
    namaDokter: "",
    layananId: "",
  });

  const [editingId, setEditingId] = useState(null);

  const didFetch = useRef(false);

  // ======================
  // LOAD DATA
  // ======================
  const loadDokter = async () => {
    try {
      setLoading(true);
      const res = await api.get("/dokter");
      setData(res.data || []);
    } catch (err) {
      console.error("LOAD DOKTER ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadLayanan = async () => {
    try {
      const res = await api.get("/layanan");
      setLayanan(res.data || []);
    } catch (err) {
      console.error("LOAD LAYANAN ERROR:", err);
    }
  };

  useEffect(() => {
    if (didFetch.current) return; // 🔥 anti double effect
    didFetch.current = true;

    loadDokter();
    loadLayanan();
  }, []);

  // ======================
  // RESET FORM
  // ======================
  const reset = () => {
    setForm({
      kodeDokter: "",
      namaDokter: "",
      layananId: "",
    });
    setEditingId(null);
  };

  // ======================
  // SUBMIT
  // ======================
  const submit = async () => {
    if (!form.kodeDokter || !form.namaDokter || !form.layananId) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/dokter/${editingId}`, form);
        alert("Dokter berhasil diupdate");
      } else {
        await api.post("/dokter", form);
        alert("Dokter berhasil ditambahkan");
      }

      reset();
      loadDokter();
    } catch (err) {
      alert(err.response?.data?.message || "Error server");
    }
  };

  // ======================
  // EDIT
  // ======================
  const edit = (item) => {
    setForm({
      kodeDokter: item.kodeDokter,
      namaDokter: item.namaDokter,
      layananId: item.layananId,
    });
    setEditingId(item.id);
  };

  // ======================
  // DELETE
  // ======================
  const hapus = async (id) => {
    if (!confirm("Hapus dokter ini?")) return;

    try {
      await api.delete(`/dokter/${id}`);
      alert("Dokter dihapus");
      loadDokter();
    } catch (err) {
        console.logger("DELETE ERROR:", err);
      alert("Gagal hapus");
    }
  };

  return (
    <div className="space-y-6">

      {/* TITLE + LOADING */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Dokter</h1>

        {loading && (
          <span className="text-sm text-gray-500">
            Loading...
          </span>
        )}
      </div>

      {/* FORM */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">

        <input
          className="w-full border p-2 rounded"
          placeholder="Kode Dokter"
          value={form.kodeDokter}
          onChange={(e) =>
            setForm({ ...form, kodeDokter: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Dokter"
          value={form.namaDokter}
          onChange={(e) =>
            setForm({ ...form, namaDokter: e.target.value })
          }
        />

        {/* DROPDOWN LAYANAN */}
        <select
          className="w-full border p-2 rounded"
          value={form.layananId}
          onChange={(e) =>
            setForm({ ...form, layananId: e.target.value })
          }
        >
          <option value="">Pilih Layanan</option>
          {layanan.map((l) => (
            <option key={l.id} value={l.id}>
              {l.namaLayanan}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={submit}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {editingId ? "Update" : "Simpan"}
          </button>

          {editingId && (
            <button
              onClick={reset}
              className="text-gray-500"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Kode</th>
              <th className="p-3 text-left">Nama</th>
              <th className="p-3 text-left">Layanan</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((d) => (
                <tr key={d.id} className="border-t">
                  <td className="p-3">{d.kodeDokter}</td>
                  <td className="p-3">{d.namaDokter}</td>
                  <td className="p-3">
                    {d.layanan?.namaLayanan || "-"}
                  </td>

                  <td className="p-3">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => edit(d)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => hapus(d.id)}
                        className="text-red-600"
                      >
                        Hapus
                      </button>
                    </div>
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