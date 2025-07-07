import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useAxios } from "../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { AxiosError } from "axios";
import logo1 from "../../assets/logo1.png";
import logom from "../../assets/logom.png";

interface LoginFormValues {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

const SignIn: React.FC = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues): Promise<void> => {
    setError(null);
    setLoading(true);

    try {
      const data = await axios<LoginResponse>({
        url: "users/login",
        method: "POST",
        body: values,
      });

      localStorage.setItem("token", data.token);
      toast.success("Muvaffaqiyatli kirish!");
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const message = err.response?.data?.message || "Login xatoligi yuz berdi";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:flex-row h-screen">
      <div className="hidden md:flex w-1/2 bg-[#00AE4B] items-center justify-center">
        <img
          src={logo1}
          alt="Logo"
          className="w-[450px] h-auto object-contain"
        />
      </div>

      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4">
        <Toaster position="top-right" />
        <div className="w-full max-w-md flex flex-col items-center justify-center min-h-screen gap-y-8">
          <div className="md:hidden">
            <img src={logom} alt="Logo" className="w-[200px] h-auto mx-auto" />
          </div>

          <div className="bg-white p-8 w-full text-black">
            <h1 className="text-gray-600 mb-6 text-center text-xl font-bold">
              <span className="text-[#00AE4B]">Fresh Line</span> tizimiga kirish
            </h1>

            {error && (
              <Alert message={error} type="error" className="mb-4" showIcon />
            )}

            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical"
              autoComplete="off"
              className="w-full"
            >
              <Form.Item
                label={<span className="text-black">Username</span>}
                name="username"
                rules={[
                  { required: true, message: "Iltimos username kiriting!" },
                ]}
              >
                <Input placeholder="your_username" className="h-[35px]" />
              </Form.Item>

              <Form.Item
                label={<span className="text-black">Parol</span>}
                name="password"
                rules={[{ required: true, message: "Iltimos parol kiriting!" }]}
              >
                <Input.Password
                  placeholder="************"
                  className="h-[35px]"
                />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  block
                  disabled={loading}
                  style={{
                    backgroundColor: "#00AE4B",
                    color: "white",
                    border: "none",
                    height: "35px",
                  }}
                  className="flex justify-center items-center"
                >
                  {loading ? (
                    <Loader className="animate-spin text-white" />
                  ) : (
                    "Kirish"
                  )}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
