import React from "react";
import {
  HomeOutlined,
  UsergroupAddOutlined,
  BookOutlined,
  TeamOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const Home: React.FC = () => {
  return (
    <div className="flex-1 text-[#00AE4B] bg-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold pb-4 flex items-center gap-2 text-[#00AE4B]">
        <HomeOutlined />
        Asosiy
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {[
          { icon: <UsergroupAddOutlined />, title: "O'quvchilar", value: 245 },
          { icon: <TeamOutlined />, title: "Guruhlar", value: 18 },
          { icon: <BookOutlined />, title: "Kurslar", value: 12 },
          { icon: <PieChartOutlined />, title: "Yangi qo'shilganlar", value: 34 },
          { icon: <PieChartOutlined />, title: "Faol foydalanuvchilar", value: 127 },
          { icon: <PieChartOutlined />, title: "Bugungi kirishlar", value: 58 },
        ].map((card, index) => (
          <div
            key={index}
            className="bg-[#F9F9F9] p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-[#00AE4B]"
          >
            <div className="text-3xl text-[#00AE4B]">{card.icon}</div>
            <h2 className="text-xl font-semibold mt-2 text-[#00AE4B]">{card.title}</h2>
            <p className="text-3xl font-bold mt-1 text-gray-600">{card.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
