import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAxios } from "../hooks/useAxios";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  image_url?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [form] = Form.useForm();
  const [passwordForm] = Form.useForm();
  const request = useAxios();

  const fetchUser = async () => {
    setLoading(true);
    try {
      const res = await request<User>({
        url: "api/auth/sign-in",
        method: "GET",
      });
      setUser(res);
    } catch {
      message.error("Foydalanuvchini olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditProfile = async () => {
    const values = await form.validateFields();
    try {
      await request({
        url: "api/auth/edit-profile",
        method: "PUT",
        body: values,
      });
      message.success("Profil muvaffaqiyatli yangilandi");
      setEditModal(false);
      fetchUser();
    } catch {
      message.error("Tahrirlashda xatolik yuz berdi");
    }
  };

  const handleChangePassword = async () => {
    const values = await passwordForm.validateFields();
    try {
      await request({
        url: "api/auth/edit-password",
        method: "PUT",
        body: values,
      });
      message.success("Parol muvaffaqiyatli o‘zgartirildi");
      setPasswordModal(false);
    } catch {
      message.error("Parolni o‘zgartirishda xatolik");
    }
  };

  const handleImageUpload = async (info: any) => {
    const formData = new FormData();
    formData.append("image", info.file.originFileObj);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/edit-profile-img`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      message.success("Rasm yangilandi");
      fetchUser();
    } catch {
      message.error("Rasmni yangilashda xatolik");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen border-l-2 text-white">
      <h1 className="text-3xl font-bold mb-8 border-b-2 pb-4">
        Profile bo'limiga xush kelibsiz
      </h1>

      {user && (
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <img
              src={user.image_url || "/api/auth/edit-profile-img"}
              alt="avatar"
              className="w-24 h-24 rounded-full border border-white"
            />
            <Upload
              showUploadList={false}
              customRequest={handleImageUpload}
            >
              <Button icon={<UploadOutlined />}>Rasmni yangilash</Button>
            </Upload>
          </div>

          <div>
            <p><strong>Ism:</strong> {user.first_name}</p>
            <p><strong>Familiya:</strong> {user.last_name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          <div className="flex gap-4">
            <Button type="primary" onClick={() => {
              form.setFieldsValue(user);
              setEditModal(true);
            }}>
              Profilni tahrirlash
            </Button>

            <Button danger onClick={() => {
              passwordForm.resetFields();
              setPasswordModal(true);
            }}>
              Parolni o‘zgartirish
            </Button>
          </div>
        </div>
      )}

      <Modal
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleEditProfile}
        okText="Saqlash"
        title="Profilni tahrirlash"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="first_name" label="Ism" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Familiya" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={passwordModal}
        onCancel={() => setPasswordModal(false)}
        onOk={handleChangePassword}
        okText="Yangilash"
        title="Parolni o‘zgartirish"
      >
        <Form form={passwordForm} layout="vertical">
          <Form.Item name="old_password" label="Eski parol" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item name="new_password" label="Yangi parol" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
