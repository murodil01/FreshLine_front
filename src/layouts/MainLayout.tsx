import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Menu } from "lucide-react";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FFFBEA] text-white">

      <div className="md:hidden flex items-center justify-between p-4 bg-[#FFFBEA] shadow">
        <button onClick={toggleSidebar}>
          <Menu className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 px-3 py-1 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div
        className={`fixed z-50 md:static transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:w-64 w-64 bg-[#FFFBEA]`}
      >
        <Sidebar onLogout={handleLogout} />
      </div>

      <main className="flex-1 p-6 mt-16 md:mt-0">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;