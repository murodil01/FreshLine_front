import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onLogout={handleLogout} />
      <main className="flex-1 bg-black p-6 text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;


/*import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const MainLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar /> 
      <main className="flex-1 bg-black p-6 text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
*/