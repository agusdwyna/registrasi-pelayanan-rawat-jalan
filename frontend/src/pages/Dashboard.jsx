import { useEffect, useState, useRef } from "react";
import api from "../api/api";

// ✅ pindahkan ke luar component
function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl border shadow-sm">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold text-blue-600">
        {value}
      </h2>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState({
    pasien: 0,
    layanan: 0,
    dokter: 0,
    asuransi: 0,
    perusahaan: 0,
  });

  const [loading, setLoading] = useState(false);

  const didFetch = useRef(false);

  const load = async () => {
    try {
      setLoading(true);

      const [p, l, d, a, per] = await Promise.all([
        api.get("/pasien"),
        api.get("/layanan"),
        api.get("/dokter"),
        api.get("/master-asuransi"),
        api.get("/master-perusahaan"),
      ]);

      setStats({
        pasien: p.data?.length || 0,
        layanan: l.data?.length || 0,
        dokter: d.data?.length || 0,
        asuransi: a.data?.length || 0,
        perusahaan: per.data?.length || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;

    load();
  }, []);

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {loading && (
          <span className="text-sm text-gray-500">
            Loading...
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        <Card title="Pasien" value={stats.pasien} />
        <Card title="Layanan" value={stats.layanan} />
        <Card title="Dokter" value={stats.dokter} />
        <Card title="Asuransi" value={stats.asuransi} />
        <Card title="Perusahaan" value={stats.perusahaan} />

      </div>

    </div>
  );
}