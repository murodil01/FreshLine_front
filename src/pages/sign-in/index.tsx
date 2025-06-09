import React, { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import { useAxios } from "../../hooks/useAxios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

interface LoginFormValues {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setError(null);
    setLoading(true);

    try {
      const data = await axios({
        url: "api/auth/sign-in",
        method: "POST",
        body: values,
      });

      localStorage.setItem("token", data.token);
      toast.success("Muvaffaqiyatli kirish!");
      navigate("/");
    } catch (err: any) {
      const errorMessage = err.message || "Login xatoligi yuz berdi";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="backdrop-blur bg-white/5 p-8 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 text-white">
        <h2 className="text-3xl font-bold text-center mb-4">
          Xush kelibsiz 👋
        </h2>
        <p className="text-gray-300 mb-6">
          Hisobingizga kirish uchun email va parolni kiriting
        </p>

        {error && (
          <Alert message={error} type="error" className="mb-4" showIcon />
        )}

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          autoComplete="off"
        >
          <Form.Item
            label={<span className="text-white">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Iltimos emailingizni kiriting!" },
              { type: "email", message: "Email noto'g'ri kiritildi!" },
            ]}
          >
            <Input
              placeholder="you@example.com"
              style={{
                color: "black",
                borderColor: "white",
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span className="text-white">Parol</span>}
            name="password"
            rules={[{ required: true, message: "Iltimos parol kiriting!" }]}
          >
            <Input.Password
              placeholder="************"
              style={{
                color: "black",
                borderColor: "white",
              }}
            />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              block
              type="primary"
              disabled={loading}
              className=" flex justify-center items-center"
            >
              {loading ? <Loader className="animate-spin text-white" /> : "Kirish"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;

