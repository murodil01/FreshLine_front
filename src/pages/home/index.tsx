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
    <div className="flex-1 text-white bg-black border-l-2 border-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold pb-4 border-b-2 flex items-center gap-2">
        <HomeOutlined />
        Asosiy
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-700">
          <UsergroupAddOutlined className="text-blue-400 text-3xl" />
          <h2 className="text-xl font-semibold mt-2">O'quvchilar</h2>
          <p className="text-3xl font-bold mt-1">245</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-700">
          <TeamOutlined className="text-green-400 text-3xl" />
          <h2 className="text-xl font-semibold mt-2">Guruhlar</h2>
          <p className="text-3xl font-bold mt-1">18</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-700">
          <BookOutlined className="text-yellow-400 text-3xl" />
          <h2 className="text-xl font-semibold mt-2">Kurslar</h2>
          <p className="text-3xl font-bold mt-1">12</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-700">
          <PieChartOutlined className="text-purple-400 text-3xl" />
          <h2 className="text-xl font-semibold mt-2">Yangi qo‘shilganlar</h2>
          <p className="text-3xl font-bold mt-1">34</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-700">
          <PieChartOutlined className="text-pink-400 text-3xl" />
          <h2 className="text-xl font-semibold mt-2">Faol foydalanuvchilar</h2>
          <p className="text-3xl font-bold mt-1">127</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-700">
          <PieChartOutlined className="text-red-400 text-3xl" />
          <h2 className="text-xl font-semibold mt-2">Bugungi kirishlar</h2>
          <p className="text-3xl font-bold mt-1">58</p>
        </div>
      </div>
    </div>
  );
};

export default Home;