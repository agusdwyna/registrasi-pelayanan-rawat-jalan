import { NavLink } from "react-router-dom";

const menu = [
  { name: "Dashboard", path: "/admin" },
  { name: "Pasien", path: "/admin/pasien" },
  { name: "Layanan", path: "/admin/layanan" },
  { name: "Dokter", path: "/admin/dokter" },
  { name: "Asuransi", path: "/admin/asuransi" },
  { name: "Perusahaan", path: "/admin/perusahaan" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 bg-white border-r shadow-sm">

      <div className="p-5 border-b">
        <h1 className="text-xl font-bold text-blue-600">
          SIMRS SYSTEM
        </h1>
      </div>

      <nav className="p-3 space-y-1">
        {menu.map((m) => (
          <NavLink
            key={m.path}
            to={m.path}
            end={m.path === "/admin"}
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`
            }
          >
            {m.name}
          </NavLink>
        ))}
      </nav>

    </aside>
  );
}