import React from "react";
import {
  CreditCardOutlined,
  DollarOutlined,
  HistoryOutlined,
  WalletOutlined,
  BankOutlined,
} from "@ant-design/icons";

const paymentOptions = [
  {
    id: 1,
    icon: <CreditCardOutlined className="text-blue-400 text-2xl" />,
    title: "Karta bilan to'lash",
    description: "Visa, MasterCard va boshqa kartalar orqali to'lov amalga oshiring.",
  },
  {
    id: 2,
    icon: <WalletOutlined className="text-green-400 text-2xl" />,
    title: "Hamyonlar",
    description: "Click, Payme, Apelsin kabi elektron hamyonlar orqali to'lov.",
  },
  {
    id: 3,
    icon: <BankOutlined className="text-purple-400 text-2xl" />,
    title: "Bank orqali to'lash",
    description: "Bank rekvizitlari orqali to'g'ridan-to'g'ri to'lov imkoniyati.",
  },
  {
    id: 4,
    icon: <DollarOutlined className="text-yellow-400 text-2xl" />,
    title: "Naqd pul to'lovi",
    description: "Ofisda naqd pul orqali to'lov imkoniyati mavjud.",
  },
  {
    id: 5,
    icon: <HistoryOutlined className="text-red-400 text-2xl" />,
    title: "To'lov tarixi",
    description: "Yakunlangan barcha to'lovlaringizni kuzatib boring.",
  },
];

const Payment: React.FC = () => {
  return (
    <div className="p-6 bg-white min-h-screen border-l-2">
      <h1 className="text-3xl font-bold text-[#46A358] mb-8 border-b-2 pb-4">
        To'lovlar bo'limiga xush kelibsiz
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentOptions.map((option) => (
          <div
            key={option.id}
            className="bg-white border-2 border-[#46A358] rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 text-[#46A358]"
          >
            <div className="flex items-center gap-4 mb-4">
              {option.icon}
              <h2 className="text-xl font-semibold">{option.title}</h2>
            </div>
            <p className="text-gray-400">{option.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Payment;
