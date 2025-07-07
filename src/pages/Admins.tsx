import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { ChevronRight, NotebookTabs } from "lucide-react";
import { useAxios } from "../hooks/useAxios";

interface Admin {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
}

const Admins: React.FC = () => {
  const [data, setData] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [form] = Form.useForm();
  const axios = useAxios();

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const response = await axios({
        url: "api/staff/all-admins",
        method: "GET",
      });
      setData(response.data ?? response);
    } catch {
      message.error("Ma'lumotlarni olishda xatolik.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleCreate = () => {
    setEditingAdmin(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (record: Admin) => {
    setEditingAdmin(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios({
        url: `/api/staff/deleted-admin?id=${id}`,
        method: "DELETE",
      });
      message.success("O'chirildi");
      fetchAdmins();
    } catch {
      message.error("O'chirishda xatolik");
    }
  };

  const handleLeave = async (id: number) => {
    try {
      await axios({
        url: `/api/staff/leave-staff?id=${id}`,
        method: "PATCH",
      });
      message.success("Bo'shatildi");
      fetchAdmins();
    } catch {
      message.error("Xatolik yuz berdi");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingAdmin) {
        await axios({
          url: `/api/staff/edited-admin?id=${editingAdmin.id}`,
          method: "PUT",
          data: values,
        });
        message.success("Tahrirlandi");
      } else {
        await axios({
          url: "/api/staff/create-admin",
          method: "POST",
          data: values,
        });
        message.success("Yaratildi");
      }
      fetchAdmins();
      setIsModalOpen(false);
    } catch {
      message.error("Saqlashda xatolik");
    }
  };

  const columns: ColumnsType<Admin> = [
    {
      title: "Ism",
      dataIndex: "first_name",
      key: "first_name",
      render: (text) => <span className="text-black">{text}</span>,
    },
    {
      title: "Familiya",
      dataIndex: "last_name",
      key: "last_name",
      render: (text) => <span className="text-black">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="text-black">{text}</span>,
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="#00AE4B">{role}</Tag>,
    },
    {
      title: "Holat",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "#00AE4B" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            onClick={() => handleEdit(record)}
            style={{
              backgroundColor: "#00AE4B",
              color: "white",
              border: "none",
            }}
          >
            Tahrirlash
          </Button>
          <Button onClick={() => handleLeave(record.id)} danger>
            Bo'shatish
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger type="dashed">
            O'chirish
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 min-h-screen">
      <div className="flex items-center gap-3 border-b border-gray-300 pb-3 mb-5">
        <NotebookTabs className="text-[#00AE4B]" />
        <h2 className="text-[#00AE4B] text-2xl font-semibold">Asosiy</h2>
        <ChevronRight className="text-[#00AE4B]" />
        <h2 className="text-[#00AE4B] text-2xl font-semibold">Admins</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#00AE4B] text-xl font-bold">Adminlar ro'yxati</h1>
        <Button
          style={{
            backgroundColor: "#00AE4B",
            color: "white",
            border: "none",
          }}
          onClick={handleCreate}
        >
          Yangi Admin
        </Button>
      </div>

      <Table<Admin>
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        bordered
        style={{
          backgroundColor: "#fff",
          borderColor: "#00AE4B",
        }}
        className="shadow-md"
      />

      <Modal
        title={editingAdmin ? "Tahrirlash" : "Yangi Admin"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText="Saqlash"
        okButtonProps={{
          style: { backgroundColor: "#00AE4B", borderColor: "#00AE4B" },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ role: "Admin", status: "Active" }}
        >
          <Form.Item
            name="first_name"
            label="Ism"
            rules={[{ required: true, message: "Ism kiritilishi shart" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Familiya"
            rules={[{ required: true, message: "Familiya kiritilishi shart" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email kiritilishi shart" },
              { type: "email", message: "To'g'ri email kiriting" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="role"
            label="Rol"
            rules={[{ required: true, message: "Rol tanlanishi shart" }]}
          >
            <Select
              options={[
                { label: "Admin", value: "Admin" },
                { label: "Super Admin", value: "Super Admin" },
              ]}
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="Holat"
            rules={[{ required: true, message: "Holat tanlanishi shart" }]}
          >
            <Select
              options={[
                { label: "Active", value: "Active" },
                { label: "Left", value: "Left" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admins;