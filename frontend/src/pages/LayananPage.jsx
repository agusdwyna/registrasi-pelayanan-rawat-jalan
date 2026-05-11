import { useEffect, useState, useRef } from "react";
import api from "../api/api";

export default function LayananPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    kodeLayanan: "",
    namaLayanan: "",
  });

  const [editingId, setEditingId] = useState(null);

  const didFetch = useRef(false);

  // ======================
  // LOAD DATA
  // ======================
  const load = async () => {
    try {
      setLoading(true);
      const res = await api.get("/layanan");
      setData(res.data || []);
    } catch (err) {
      console.error("LOAD ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didFetch.current) return; // 🔥 guard anti double fetch
    didFetch.current = true;

    load();
  }, []);

  // ======================
  // RESET FORM
  // ======================
  const reset = () => {
    setForm({
      kodeLayanan: "",
      namaLayanan: "",
    });
    setEditingId(null);
  };

  // ======================
  // SUBMIT CREATE / UPDATE
  // ======================
  const submit = async () => {
    if (!form.kodeLayanan || !form.namaLayanan) {
      alert("Semua field wajib diisi");
      return;
    }

    try {
      if (editingId) {
        await api.put(`/layanan/${editingId}`, form);
        alert("Layanan berhasil diupdate");
      } else {
        await api.post("/layanan", form);
        alert("Layanan berhasil ditambahkan");
      }

      reset();
      load();
    } catch (err) {
      alert(err.response?.data?.message || "Server error");
    }
  };

  // ======================
  // EDIT
  // ======================
  const edit = (item) => {
    setForm({
      kodeLayanan: item.kodeLayanan,
      namaLayanan: item.namaLayanan,
    });
    setEditingId(item.id);
  };

  // ======================
  // DELETE
  // ======================
  const hapus = async (id) => {
    if (!confirm("Hapus layanan ini?")) return;

    try {
      await api.delete(`/layanan/${id}`);
      alert("Berhasil dihapus");
      load();
    } catch (err) {
        console.error("DELETE ERROR:", err);
      alert("Gagal hapus");
    }
  };

  return (
    <div className="space-y-6">

      {/* TITLE + LOADING */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Master Layanan</h1>

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
          placeholder="Kode Layanan"
          value={form.kodeLayanan}
          onChange={(e) =>
            setForm({ ...form, kodeLayanan: e.target.value })
          }
        />

        <input
          className="w-full border p-2 rounded"
          placeholder="Nama Layanan"
          value={form.namaLayanan}
          onChange={(e) =>
            setForm({ ...form, namaLayanan: e.target.value })
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
      <div className="bg-white border rounded-xl overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Kode</th>
              <th className="p-3 text-left">Nama Layanan</th>
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
              data.map((l) => (
                <tr key={l.id} className="border-t">
                  <td className="p-3">{l.kodeLayanan}</td>
                  <td className="p-3">{l.namaLayanan}</td>

                  <td className="p-3">
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={() => edit(l)}
                        className="text-blue-600"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => hapus(l.id)}
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