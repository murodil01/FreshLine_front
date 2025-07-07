/*import React, { useState } from "react";
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
import {
  FaChalkboardTeacher,
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import logom from "../assets/logom.png";

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

const otherItems = [
  { key: "settings", icon: <SettingOutlined />, label: "Sozlamalar", path: "/settings" },
  { key: "profile", icon: <ProfileOutlined />, label: "Profil", path: "/profile" },
];

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const selectedKey = (() => {
    const path = location.pathname;
    const all = [...menuItems, ...otherItems];
    const match = all.sort((a, b) => b.path.length - a.path.length).find((item) => path.startsWith(item.path));
    return match?.key || "";
  })();

  const renderMenu = (items: typeof menuItems) =>
    items.map(({ key, icon, label, path }) => ({
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
    }));

  return (
    <>
      <div className="hidden md:flex flex-col w-64 min-h-screen bg-[#FFFBEA] text-[#5F6178] px-6 pt-6 border-r-2 border-[#5F6178]">
        <img src={logom} alt="Logo" className="w-40 h-auto mb-8" />
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ backgroundColor: "transparent", border: "none", color: "#5F6178" }}
          items={renderMenu(menuItems)}
        />
        <div className="mt-8">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: "transparent", border: "none", color: "#5F6178" }}
            items={[
              ...renderMenu(otherItems),
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: (
                  <button
                    onClick={onLogout}
                    className="w-full text-left text-[#5F6178] bg-transparent"
                  >
                    Logout
                  </button>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div className="fixed top-0 left-0 md:hidden z-50 p-4">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 24, color: "#5F6178" }} />}
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      <div className="fixed top-0 bottom-0 left-0 md:hidden w-16 pt-16 bg-[#FFFBEA] border-r border-gray-300 z-40 flex flex-col items-center">
        {menuItems.concat(otherItems).map(({ key, icon, label, path }) => (
          <Tooltip key={key} placement="right" title={label}>
            <Link
              to={path}
              className={`text-[#5F6178] flex items-center justify-center w-10 h-10 my-2 rounded ${
                selectedKey === key ? "border border-[#5F6178]" : ""
              }`}
              onClick={() => setDrawerOpen(false)}
            >
              {icon}
            </Link>
          </Tooltip>
        ))}
        <Tooltip title="Logout">
          <button
            onClick={onLogout}
            className="text-[#5F6178] w-10 h-10 my-2 mt-auto flex items-center justify-center"
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
        closeIcon={<IoClose size={24} color="#5F6178" />}
        styles={{
          header: { backgroundColor: "#FFFBEA", borderBottom: "none" },
          body: { padding: 0, backgroundColor: "#FFFBEA" },
        }}
      >
        <div className="text-[#5F6178] px-4 pt-6">
          <h2 className="text-xl font-bold mb-4">Admin CRM</h2>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: "transparent", border: "none", color: "#5F6178" }}
            items={renderMenu(menuItems)}
          />
          <div className="mt-8">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              style={{ backgroundColor: "transparent", border: "none", color: "#5F6178" }}
              items={[
                ...renderMenu(otherItems),
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: (
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left text-[#5F6178] bg-transparent"
                    >
                      Logout
                    </button>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Drawer>

      <style>
        {`
          .ant-menu-item-selected {
            border: 1px solid #5F6178 !important;
            border-radius: 8px !important;
            background-color: transparent !important;
          }
          .ant-menu-item {
            margin: 4px 0 !important;
            background-color: transparent !important;
            color: #5F6178 !important;
          }
          .ant-menu-dark .ant-menu-item-selected {
            color: #5F6178 !important;
          }
        `}
      </style>
    </>
  );
};

export default Sidebar;*/

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
import {
  FaChalkboardTeacher,
  FaHome,
  FaUserGraduate,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import logo2 from "../assets/logo2.png";

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

const otherItems = [
  { key: "settings", icon: <SettingOutlined />, label: "Sozlamalar", path: "/settings" },
  { key: "profile", icon: <ProfileOutlined />, label: "Profil", path: "/profile" },
];

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const selectedKey = (() => {
    const path = location.pathname;
    const all = [...menuItems, ...otherItems];
    const match = all.sort((a, b) => b.path.length - a.path.length).find((item) => path.startsWith(item.path));
    return match?.key || "";
  })();

  const renderMenu = (items: typeof menuItems) =>
    items.map(({ key, icon, label, path }) => ({
      key,
      icon,
      label: (
        <Link to={path} onClick={() => setDrawerOpen(false)} className="bg-transparent text-white">
          {label}
        </Link>
      ),
    }));

  return (
    <>
      <div className="hidden md:flex flex-col w-64 min-h-screen bg-[#00AE4B] text-white px-6 pt-6">
        <img src={logo2} alt="Logo" className="w-40 h-auto mb-8" />
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ backgroundColor: "transparent", border: "none", color: "white" }}
          items={renderMenu(menuItems)}
        />
        <div className="mt-8">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: "transparent", border: "none", color: "white" }}
            items={[
              ...renderMenu(otherItems),
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: (
                  <button onClick={onLogout} className="w-full text-left text-white bg-transparent">
                    Logout
                  </button>
                ),
              },
            ]}
          />
        </div>
      </div>

      <div className="fixed top-0 left-0 md:hidden z-50 p-4">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 24, color: "white" }} />}
          onClick={() => setDrawerOpen(true)}
        />
      </div>

      <div className="fixed top-0 bottom-0 left-0 md:hidden w-16 pt-16 bg-[#00AE4B] border-r border-white z-40 flex flex-col items-center">
        {menuItems.concat(otherItems).map(({ key, icon, label, path }) => (
          <Tooltip key={key} placement="right" title={label}>
            <Link
              to={path}
              className={`text-white flex items-center justify-center w-10 h-10 my-2 rounded ${
                selectedKey === key ? "border border-white" : ""
              }`}
              onClick={() => setDrawerOpen(false)}
            >
              {icon}
            </Link>
          </Tooltip>
        ))}
        <Tooltip title="Logout">
          <button
            onClick={onLogout}
            className="text-white w-10 h-10 my-2 mt-auto flex items-center justify-center"
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
        styles={{ header: { backgroundColor: "#00AE4B" }, body: { backgroundColor: "#00AE4B" } }}
      >
        <div className="text-white px-4 pt-6">
          <h2 className="text-xl font-bold mb-4">Admin CRM</h2>
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            style={{ backgroundColor: "transparent", border: "none", color: "white" }}
            items={renderMenu(menuItems)}
          />
          <div className="mt-8">
            <Menu
              mode="inline"
              selectedKeys={[selectedKey]}
              style={{ backgroundColor: "transparent", border: "none", color: "white" }}
              items={[
                ...renderMenu(otherItems),
                {
                  key: "logout",
                  icon: <LogoutOutlined />,
                  label: (
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left text-white bg-transparent"
                    >
                      Logout
                    </button>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </Drawer>

      <style>{`
        .ant-menu-item-selected {
          border: 1px solid white !important;
          border-radius: 8px !important;
          background-color: transparent !important;
        }
        .ant-menu-item {
          margin: 4px 0 !important;
          background-color: transparent !important;
          color: white !important;
        }
        .ant-menu-dark .ant-menu-item-selected {
          color: white !important;
        }
      `}</style>
    </>
  );
};

export default Sidebar;
