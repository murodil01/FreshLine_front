import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Managers from "./Managers";
import Admins from "./Admins";
import Teachers from "./Teachers";
import Groups from "./Groups";
import Home from "./home/index";
import Students from "./Students";
import Kurs from "./Kurs";
import Payment from "./Payment";
import Settings from "./Settings";
import Profile from "./Profile";

interface DashboardProps {
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="flex">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 p-6 bg-[#FFFBEA] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/admins" element={<Admins />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/courses" element={<Kurs />} />
          <Route path="/payments" element={<Payment />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
