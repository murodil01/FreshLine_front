import React from "react";
import {
  UserOutlined,
  BellOutlined,
  LockOutlined,
  GlobalOutlined,
  BgColorsOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const settingsOptions = [
  {
    id: 1,
    icon: <UserOutlined className="text-blue-400 text-2xl" />,
    title: "Profil sozlamalari",
    description: "Ism, email, parol va boshqa profil ma'lumotlarini o'zgartiring.",
  },
  {
    id: 2,
    icon: <BellOutlined className="text-yellow-400 text-2xl" />,
    title: "Bildirishnomalar",
    description: "Xabarnoma turini sozlang va email ogohlantirishlarni boshqaring.",
  },
  {
    id: 3,
    icon: <LockOutlined className="text-red-400 text-2xl" />,
    title: "Xavfsizlik",
    description: "2 bosqichli autentifikatsiya va parol sozlamalarini o'rnating.",
  },
  {
    id: 4,
    icon: <GlobalOutlined className="text-green-400 text-2xl" />,
    title: "Til sozlamalari",
    description: "Platforma tilini tanlang va lokalizatsiya sozlamalarini bajaring.",
  },
  {
    id: 5,
    icon: <BgColorsOutlined className="text-purple-400 text-2xl" />,
    title: "Rejim",
    description: "Dark yoki Light rejimni tanlang.",
  },
  {
    id: 6,
    icon: <DeleteOutlined className="text-pink-500 text-2xl" />,
    title: "Hisobni o'chirish",
    description: "Agar kerak bo'lsa, hisobingizni doimiy o'chiring.",
  },
];

const Settings: React.FC = () => {
  return (
    <div className="p-6 bg-white min-h-screen border-l-2">
      <h1 className="text-3xl font-bold text-[#46A358] mb-8 border-b-2 pb-4">
        Sozlamalar bo'limiga xush kelibsiz
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsOptions.map((option) => (
          <div
            key={option.id}
            className="bg-white border-2 border-[#46A358] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-[#46A358]"
          >
            <div className="flex items-center gap-4 mb-4">
              <div>{option.icon}</div>
              <h2 className="text-xl font-semibold">{option.title}</h2>
            </div>
            <p className="text-gray-400">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
