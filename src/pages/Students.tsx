import React from "react";

const Students: React.FC = () => {
  return (
    <div className="p-6 bg-white min-h-screen border-l-2">
      <h1 className="text-2xl font-bold text-[#00AE4B] mb-6 border-b-2 border-[#00AE4B] pb-2">
        Studentlar bo'limiga xush kelibsiz
      </h1>

      <img
        src="https://avatars.mds.yandex.net/i?id=ceb273d697aba8ed849c9c64a7f04a4f_l-5866270-images-thumbs&n=13"
        alt="Students"
        className="w-full max-w-md mx-auto rounded-2xl shadow-lg transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export default Students;
