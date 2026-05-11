import { useEffect, useState, useRef } from "react";
import api from "../api/api";

export default function MasterPerusahaanPage() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    kodePerusahaan: "",
    namaPerusahaan: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const didFetch = useRef(false);

  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/master-perusahaan");
      setData(res.data || []);
    } catch (err) {
      console.error("LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didFetch.current) return; // 🔥 prevent double run
    didFetch.current = true;

    load();
  }, []);
  // ======================
  // HANDLE CHANGE (clean pattern)
  // ======================
  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // ======================
  // RESET FORM
  // ======================
  const reset = () => {
    setForm({
      kodePerusahaan: "",
      namaPerusahaan: "",
    });
    setEditingId(null);
  };

  // ======================
  // VALIDATION
  // ======================
  const validate = () => {
    if (form.kodePerusahaan.trim().length < 2) {
      alert("Kode minimal 2 karakter");
      return false;
    }

    if (form.namaPerusahaan.trim().length < 3) {
      alert("Nama minimal 3 karakter");
      return false;
    }

    return true;
  };

  // ======================
  // SUBMIT (CREATE / UPDATE)
  // ======================
 const submit = async () => {
  if (!validate()) return;

  try {
    if (editingId) {
      await api.put(`/master-perusahaan/${editingId}`, form);

      // 🔥 SUCCESS ALERT UPDATE
      alert("Data perusahaan berhasil diupdate");
    } else {
      await api.post("/master-perusahaan", form);

      // 🔥 SUCCESS ALERT CREATE
      alert("Data perusahaan berhasil ditambahkan");
    }

    reset();
    load();
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    alert(
      err.response?.data?.message ||
      "Terjadi kesalahan server"
    );
  }
};

  // ======================
  // EDIT
  // ======================
  const edit = (item) => {
    setForm({
      kodePerusahaan: item.kodePerusahaan,
      namaPerusahaan: item.namaPerusahaan,
    });
    setEditingId(item.id);
  };

  // ======================
  // DELETE
  // ======================
  const hapus = async (id) => {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    try {
      await api.delete(`/master-perusahaan/${id}`);
      load();
    } catch (err) {
      console.error("DELETE ERROR:", err);
      alert("Gagal menghapus data");
    }
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Master Perusahaan
        </h1>

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
          placeholder="Kode Perusahaan"
          value={form.kodePerusahaan}
          onChange={(e) =>
            handleChange("kodePerusahaan", e.target.value)
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Perusahaan"
          value={form.namaPerusahaan}
          onChange={(e) =>
            handleChange("namaPerusahaan", e.target.value)
          }
        />

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
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-4 text-center text-gray-500">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-3">{item.kodePerusahaan}</td>
                  <td className="p-3">{item.namaPerusahaan}</td>

                  <td className="p-3">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => edit(item)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => hapus(item.id)}
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