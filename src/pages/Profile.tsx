import React from "react";
import { Avatar } from "antd";
import { UserOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";

const Profile: React.FC = () => {
  const user = {
    name: "Aliyev Akbar",
    email: "usern88@mail.ru",
    phone: "+998 90 123 45 67",
    avatar: "", 
    role: "Admin",
  };

  return (
    <div className="p-6 bg-white min-h-screen border-l-2 text-[#46A358]">
      <h1 className="text-3xl font-bold mb-8 border-b-2 pb-4">
        Profile bo'limiga xush kelibsiz
      </h1>

      <div className="bg-white border-2 border-[#46A358] p-6 rounded-2xl shadow-md max-w-2xl mx-auto flex items-center gap-6">
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={user.avatar || undefined}
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-400 flex items-center gap-2 mt-2">
            <MailOutlined /> {user.email}
          </p>
          <p className="text-gray-400 flex items-center gap-2 mt-1">
            <PhoneOutlined /> {user.phone}
          </p>
          <p className="text-green-400 font-medium mt-2">
            Rol: <span className="capitalize">{user.role}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
