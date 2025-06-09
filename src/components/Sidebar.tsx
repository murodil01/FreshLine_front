import React, { useState } from "react";
import { Menu, Drawer, Button, Tooltip } from "antd";
import {
  UserOutlined,
  CreditCardOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SettingOutlined,
  ReadOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";

const menuItems = [
  { key: "dashboard", icon: <FaHome />, label: "Asosiy", path: "/" },
  { key: "managers", icon: <UserOutlined />, label: "Menejerlar", path: "/managers" },
  { key: "admins", icon: <FaUserTie />, label: "Adminlar", path: "/admins" },
  { key: "teachers", icon: <FaChalkboardTeacher />, label: "Ustozlar", path: "/teachers" },
  { key: "students", icon: <FaUserGraduate />, label: "Studentlar", path: "/students" },
  { key: "groups", icon: <FaUsers />, label: "Guruhlar", path: "/groups" },
  { key: "courses", icon: <ReadOutlined />, label: "Kurslar", path: "/courses" },
  { key: "payments", icon: <CreditCardOutlined />, label: "To'lovlar", path: "/payments" },
];

const othersItems = [
  { key: "settings", icon: <SettingOutlined />, label: "Sozlamalar", path: "/settings" },
  { key: "profile", icon: <ProfileOutlined />, label: "Profil", path: "/profile" },
];

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === "/") return "dashboard";
    if (path.startsWith("/managers")) return "managers";
    if (path.startsWith("/admins")) return "admins";
    if (path.startsWith("/teachers")) return "teachers";
    if (path.startsWith("/students")) return "students";
    if (path.startsWith("/groups")) return "groups";
    if (path.startsWith("/courses")) return "courses";
    if (path.startsWith("/payments")) return "payments";
    if (path.startsWith("/settings")) return "settings";
    if (path.startsWith("/profile")) return "profile";
    return "";
  };

  const selectedKey = getSelectedKey();

  return (
    <>
      <div className="hidden md:flex flex-col justify-start w-64 min-h-screen bg-black text-white px-6 pt-6 pb-2">
        <h2 className="text-2xl font-bold mb-4">Admin CRM</h2>
        <p className="mb-4 text-gray-400 uppercase tracking-wide text-sm">Menu</p>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ backgroundColor: "transparent", border: "none" }}
          items={menuItems.map(({ key, icon, label, path }) => ({
            key,
            icon,
            label: <Link to={path}>{label}</Link>,
          }))}
          className="bg-transparent"
        />

        <p className="mb-4 mt-8 text-gray-400 uppercase tracking-wide text-sm">Boshqalar</p>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ backgroundColor: "transparent", border: "none" }}
          items={[
            ...othersItems.map(({ key, icon, label, path }) => ({
              key,
              icon,
              label: <Link to={path}>{label}</Link>,
            })),
            {
              key: "logout",
              icon: <LogoutOutlined />,
              label: (
                <button
                  onClick={onLogout}
                  className="w-full text-left bg-transparent border-none p-0 m-0 text-white cursor-pointer"
                >
                  Logout
                </button>
              ),
            },
          ]}
          className="bg-transparent"
        />
      </div>

      <div className="fixed top-0 bottom-0 left-0 md:hidden bg-black flex flex-col items-center w-16 py-4 z-50 border-r border-gray-700">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: "24px", color: "white" }} />}
          onClick={() => setDrawerOpen(true)}
          className="mb-6"
        />

        {menuItems.map(({ key, icon, label, path }) => (
          <Tooltip placement="right" title={label} key={key}>
            <Link
              to={path}
              className={`text-white text-xl flex items-center justify-center w-12 h-12 mb-3 rounded ${
                selectedKey === key ? "border border-white" : ""
              }`}
            >
              {icon}
            </Link>
          </Tooltip>
        ))}

        {othersItems.map(({ key, icon, label, path }) => (
          <Tooltip placement="right" title={label} key={key}>
            <Link
              to={path}
              className={`text-white text-xl flex items-center justify-center w-12 h-12 mb-3 rounded ${
                selectedKey === key ? "border border-white" : ""
              }`}
            >
              {icon}
            </Link>
          </Tooltip>
        ))}

        <Tooltip placement="right" title="Logout">
          <button
            onClick={onLogout}
            className="text-white text-xl flex items-center justify-center w-12 h-12 mt-auto bg-transparent cursor-pointer"
          >
            <LogoutOutlined />
          </button>
        </Tooltip>
      </div>

      <Drawer
        placement="left"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={250}
        closeIcon={<IoClose size={24} color="white" />}
        styles={{
          header: { backgroundColor: "#000", borderBottom: "none" },
          body: { padding: 0, backgroundColor: "#000" },
        }}
      >
        <div className="flex flex-col h-full w-full text-white px-6 pt-6 pb-2">
          <h2 className="text-2xl font-bold mb-4">Admin CRM</h2>
          <p className="mb-4 text-gray-400 uppercase tracking-wide text-sm">Menu</p>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: "transparent", border: "none" }}
            items={menuItems.map(({ key, icon, label, path }) => ({
              key,
              icon,
              label: (
                <Link
                  to={path}
                  onClick={() => setDrawerOpen(false)}
                  className="bg-transparent"
                >
                  {label}
                </Link>
              ),
            }))}
          />

          <p className="mb-4 mt-8 text-gray-400 uppercase tracking-wide text-sm">Boshqalar</p>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: "transparent", border: "none" }}
            items={[
              ...othersItems.map(({ key, icon, label, path }) => ({
                key,
                icon,
                label: (
                  <Link
                    to={path}
                    onClick={() => setDrawerOpen(false)}
                    className="bg-transparent"
                  >
                    {label}
                  </Link>
                ),
              })),
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: (
                  <button
                    onClick={() => {
                      setDrawerOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left bg-transparent border-none p-0 m-0 text-white cursor-pointer"
                  >
                    Logout
                  </button>
                ),
              },
            ]}
          />
        </div>
      </Drawer>

      <style>
        {`
          .ant-menu-item-selected {
            border: 1px solid white !important;
            border-radius: 8px !important;
            background-color: transparent !important;
          }
          .ant-menu-item {
            margin: 4px 0 !important;
            background-color: transparent !important;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;