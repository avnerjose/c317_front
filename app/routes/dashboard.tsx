import { Outlet } from "@remix-run/react";

function Dashboard() {
  return (
    <div className="grid grid-cols-dashboard min-h-screen">
      <aside className="flex flex-col bg-blue-500 drop-shadow-default">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-white">Renzo Mequista</span>
            <span className="text-gray-200">Administrador</span>
          </div>
        </div>

        <button className="border-t border-t-gray-200 mt-auto px-6 py-5 flex w-full transition-colors hover:bg-blue-900">
          <span className="text-white text-xl">Sair</span>
        </button>
      </aside>
      <main className="bg-gray-100 p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
