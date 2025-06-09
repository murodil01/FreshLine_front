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
import { useAxios } from "../hooks/useAxios";
import { ChevronRight, NotebookTabs, } from "lucide-react";

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
      const admins = await axios<Admin[]>({
        url: "api/staff/all-admins",
        method: "GET",
      });
      setData(admins);
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      message.error("Xatolik yuz berdi");
    }
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    try {
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
    } catch (error) {
      message.error("Saqlashda xatolik");
    }
  };

  const columns = [
    {
      title: "Ism",
      dataIndex: "first_name",
      key: "first_name",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Familiya",
      dataIndex: "last_name",
      key: "last_name",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span style={{ color: "white" }}>{text}</span>,
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="geekblue">{role}</Tag>,
    },
    {
      title: "Holat",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "Amallar",
      key: "actions",
      render: (_: any, record: Admin) => (
        <Space>
          <Button onClick={() => handleEdit(record)} type="primary">
            Tahrirlash
          </Button>
          <Button onClick={() => handleLeave(record.id)} danger>
            Bo'shatish
          </Button>
          <Button onClick={() => handleDelete(record.id)} danger type="dashed">
            O‘chirish
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div
      className="border-l-2"
      style={{
        padding: "24px",
        backgroundColor: "black",
        minHeight: "100vh",
      }}
    >
      <div className="flex items-center gap-3 border-b border-gray-700 pb-3 mb-5">
        <NotebookTabs className="text-white" />
        <h2 className="text-white text-2xl font-semibold">Asosiy</h2>
        <ChevronRight className="text-white" />
        <h2 className="text-white text-2xl font-semibold">Admins</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-xl font-bold">Adminlar ro'yxati</h1>
        <Button className="bg-white" onClick={handleCreate}>
          Yangi Admin
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={false}
        bordered
        style={{
          backgroundColor: "black",
          color: "white",
          borderColor: "white",
        }}
        components={{
          header: {
            row: (props: any) => (
              <tr
                {...props}
                style={{ backgroundColor: "black", color: "white" }}
              />
            ),
            cell: (props: any) => (
              <th
                {...props}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderBottom: "1px solid white",
                  borderRight: "1px solid white",
                  padding: "12px 8px",
                  ...props.style,
                }}
              />
            ),
          },
          body: {
            row: (props: any) => (
              <tr
                {...props}
                style={{ backgroundColor: "black", color: "white" }}
              />
            ),
            cell: (props: any) => (
              <td
                {...props}
                style={{
                  backgroundColor: "black",
                  color: "white",
                  borderBottom: "1px solid white",
                  borderRight: "1px solid white",
                  padding: "12px 8px",
                  ...props.style,
                }}
              />
            ),
          },
        }}
      />

      <Modal
        title={editingAdmin ? "Tahrirlash" : "Yangi Admin"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleSubmit}
        okText="Saqlash"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="first_name" label="Ism" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Familiya"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Rol" rules={[{ required: true }]}>
            <Select
              options={[
                { label: "Admin", value: "Admin" },
                { label: "Super Admin", value: "Super Admin" },
              ]}
            />
          </Form.Item>
          <Form.Item name="status" label="Holat" rules={[{ required: true }]}>
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
