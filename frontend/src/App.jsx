import { BrowserRouter, Routes, Route } from "react-router-dom";

import AdminLayout from "./pages/Admin";

import Dashboard from "./pages/Dashboard";
import PasienPage from "./pages/PasienPage";
import LayananPage from "./pages/LayananPage";
import DokterPage from "./pages/DokterPage";
import AsuransiPage from "./pages/MasterAsuransiPage";
import PerusahaanPage from "./pages/MasterPerusahaanPage";

import PasienForm from "./pages/PasienForm";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<PasienForm />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="pasien" element={<PasienPage />} />
          <Route path="layanan" element={<LayananPage />} />
          <Route path="dokter" element={<DokterPage />} />
          <Route path="asuransi" element={<AsuransiPage />} />
          <Route path="perusahaan" element={<PerusahaanPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}