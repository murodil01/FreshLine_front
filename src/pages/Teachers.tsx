/*import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Dropdown,
  Menu,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ChevronRight, NotebookTabs } from "lucide-react";

interface Teacher {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

const Teachers: React.FC = () => {
  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const token = localStorage.getItem("token") || "";
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [form] = Form.useForm();

  const fetchSearchedTeachers = async (value: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/teacher/return-teacher`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: value }),
      });

      if (!res.ok) throw new Error("Qidiruvda xatolik yuz berdi");

      const resData = await res.json();
      const teachers = resData.data || resData;

      const formatted: Teacher[] = teachers.map((item: any, idx: number) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        role: "Teacher",
        status: idx % 2 === 0 ? "Active" : "Inactive",
      }));

      setData(formatted);
    } catch (err) {
      message.error("Qidirishda xatolik yuz berdi");
    }
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/teacher/get-all-teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Ma'lumotlarni olishda xatolik");

      const resData = await res.json();
      const teachers = resData.data || resData;

      const formatted: Teacher[] = teachers.map((item: any, idx: number) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        role: "Teacher",
        status: idx % 2 === 0 ? "Active" : "Inactive",
      }));

      setData(formatted);
    } catch (err: any) {
      setError("Xatolik: " + err.message);
      message.error("Ma'lumotlarni olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddTeacher = async (values: any) => {
    try {
      const res = await fetch(`${baseUrl}/api/teacher/create-teacher`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
        }),
      });

      if (!res.ok) throw new Error("Yangi ustozni yaratishda xatolik");

      message.success("Yangi ustoz muvaffaqiyatli qosshildi");
      setIsModalOpen(false);
      form.resetFields();
      fetchTeachers(); 
    } catch (err: any) {
      message.error(err.message || "Xatolik yuz berdi");
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue.trim() !== "") {
        fetchSearchedTeachers(searchValue);
      } else {
        fetchTeachers();
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const columns = [
    {
      title: <span className="text-white">Ism</span>,
      dataIndex: "firstName",
      key: "firstName",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Familiya</span>,
      dataIndex: "lastName",
      key: "lastName",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Email</span>,
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Rol</span>,
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="purple">{role}</Tag>,
    },
    {
      title: <span className="text-white">Holat</span>,
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: Teacher) => {
        const menu = (
          <Menu>
            <Menu.Item key="edit">
              <EditOutlined className="mr-2 text-blue-500" />
              Tahrirlash
            </Menu.Item>
            <Menu.Item key="delete">
              <DeleteOutlined className="mr-2 text-red-500" />
              O‘chirish
            </Menu.Item>
          </Menu>
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-black min-h-screen border-l-2">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-3 mb-5">
        <NotebookTabs className="text-white" />
        <h2 className="text-white text-2xl font-semibold">Asosiy</h2>
        <ChevronRight className="text-white" />
        <h2 className="text-white text-2xl font-semibold">Teachers</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-xl font-bold">Ustozlar ro'yxati</h1>

        <div className="flex items-center gap-4">
          <Input.Search
            placeholder="Ustozni qidirish..."
            allowClear
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 250 }}
          />
          <Button
            style={{ backgroundColor: "white", color: "black" }}
            className="text-white"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
          >
            <span className="text-black">Ustoz qo'shish</span>
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="custom-black-table"
        bordered
      />

      <Modal
        title="Yangi ustoz qo'shish"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Qo‘shish"
        cancelText="Bekor qilish"
      >
        <Form form={form} layout="vertical" onFinish={handleAddTeacher}>
          <Form.Item
            name="firstName"
            label="Ism"
            rules={[{ required: true, message: "Ism kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Familiya"
            rules={[{ required: true, message: "Familiya kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, type: "email", message: "Email noto‘g‘ri!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;*/

import React, { useEffect, useState } from "react";
import {
  Table,
  Tag,
  Dropdown,
  Menu,
  Button,
  Modal,
  Form,
  Input,
  message,
} from "antd";
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { ChevronRight, NotebookTabs } from "lucide-react";

interface Teacher {
  id: number | string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: string;
}

const Teachers: React.FC = () => {
  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const token = localStorage.getItem("token") || "";
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  const fetchSearchedTeachers = async (value: string) => {
    try {
      const res = await fetch(`${baseUrl}/api/teacher/return-teacher`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: value }),
      });

      if (!res.ok) throw new Error("Qidiruvda xatolik yuz berdi");

      const resData = await res.json();
      const teachers = resData.data || resData;

      const formatted: Teacher[] = teachers.map((item: any, idx: number) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        role: "Teacher",
        status: idx % 2 === 0 ? "Active" : "Inactive",
      }));

      setData(formatted);
    } catch (err) {
      message.error("Qidirishda xatolik yuz berdi");
    }
  };

  const fetchTeachers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}/api/teacher/get-all-teachers`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Ma'lumotlarni olishda xatolik");

      const resData = await res.json();
      const teachers = resData.data || resData;

      const formatted: Teacher[] = teachers.map((item: any, idx: number) => ({
        id: item.id,
        firstName: item.first_name,
        lastName: item.last_name,
        email: item.email,
        role: "Teacher",
        status: idx % 2 === 0 ? "Active" : "Inactive",
      }));

      setData(formatted);
    } catch (err: any) {
      setError("Xatolik: " + err.message);
      message.error("Ma'lumotlarni olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddTeacher = async (values: any) => {
    try {
      const res = await fetch(`${baseUrl}/api/teacher/create-teacher`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
        }),
      });

      if (!res.ok) throw new Error("Yangi ustozni yaratishda xatolik");

      message.success("Yangi ustoz muvaffaqiyatli qo'shildi");
      setIsAddModalOpen(false);
      form.resetFields();
      fetchTeachers();
    } catch (err: any) {
      message.error(err.message || "Xatolik yuz berdi");
    }
  };

  const handleEditTeacher = async (values: any) => {
    if (!editingTeacher) return;

    try {
      const res = await fetch(`${baseUrl}/api/teacher/update-teacher/${editingTeacher.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
        }),
      });

      if (!res.ok) throw new Error("Ustozni tahrirlashda xatolik");

      message.success("Ustoz muvaffaqiyatli tahrirlandi");
      setIsEditModalOpen(false);
      setEditingTeacher(null);
      editForm.resetFields();
      fetchTeachers();
    } catch (err: any) {
      message.error(err.message || "Xatolik yuz berdi");
    }
  };

  const handleDeleteTeacher = (teacher: Teacher) => {
    Modal.confirm({
      title: "Ustozni o'chirish",
      content: `Siz ${teacher.firstName} ${teacher.lastName} ni o'chirmoqchimisiz?`,
      okText: "Ha",
      cancelText: "Yo'q",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await fetch(`${baseUrl}/api/teacher/delete-teacher/${teacher.id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("Ustozni o'chirishda xatolik");

          message.success("Ustoz muvaffaqiyatli o'chirildi");
          fetchTeachers();
        } catch (err: any) {
          message.error(err.message || "Xatolik yuz berdi");
        }
      },
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchValue.trim() !== "") {
        fetchSearchedTeachers(searchValue);
      } else {
        fetchTeachers();
      }
    }, 400);
    return () => clearTimeout(timeout);
  }, [searchValue]);

  const columns = [
    {
      title: <span className="text-white">Ism</span>,
      dataIndex: "firstName",
      key: "firstName",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Familiya</span>,
      dataIndex: "lastName",
      key: "lastName",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Email</span>,
      dataIndex: "email",
      key: "email",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Rol</span>,
      dataIndex: "role",
      key: "role",
      render: (role: string) => <Tag color="purple">{role}</Tag>,
    },
    {
      title: <span className="text-white">Holat</span>,
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_: any, record: Teacher) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              if (key === "edit") {
                setEditingTeacher(record);
                editForm.setFieldsValue({
                  firstName: record.firstName,
                  lastName: record.lastName,
                  email: record.email,
                });
                setIsEditModalOpen(true);
              }
              if (key === "delete") {
                handleDeleteTeacher(record);
              }
            }}
            items={[
              {
                key: "edit",
                icon: <EditOutlined className="text-blue-500" />,
                label: "Tahrirlash",
              },
              {
                key: "delete",
                icon: <DeleteOutlined className="text-red-500" />,
                label: "O‘chirish",
              },
            ]}
          />
        );

        return (
          <Dropdown overlay={menu} trigger={["click"]} placement="bottomRight">
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="p-6 bg-black min-h-screen border-l-2">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-3 mb-5">
        <NotebookTabs className="text-white" />
        <h2 className="text-white text-2xl font-semibold">Asosiy</h2>
        <ChevronRight className="text-white" />
        <h2 className="text-white text-2xl font-semibold">Teachers</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-xl font-bold">Ustozlar ro'yxati</h1>

        <div className="flex items-center gap-4">
          <Input.Search
            placeholder="Ustozni qidirish..."
            allowClear
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 250 }}
            value={searchValue}
          />
          <Button
            style={{ backgroundColor: "white", color: "black" }}
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            <span className="text-black">Ustoz qo'shish</span>
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="custom-black-table"
        bordered
      />

      {/* Add Teacher Modal */}
      <Modal
        title="Yangi ustoz qo'shish"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => form.submit()}
        okText="Qo‘shish"
        cancelText="Bekor qilish"
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleAddTeacher}>
          <Form.Item
            name="firstName"
            label="Ism"
            rules={[{ required: true, message: "Ism kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Familiya"
            rules={[{ required: true, message: "Familiya kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email kiriting!" },
              { type: "email", message: "Email noto‘g‘ri!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Teacher Modal */}
      <Modal
        title="Ustozni tahrirlash"
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false);
          setEditingTeacher(null);
          editForm.resetFields();
        }}
        onOk={() => editForm.submit()}
        okText="Saqlash"
        cancelText="Bekor qilish"
        destroyOnClose
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditTeacher}>
          <Form.Item
            name="firstName"
            label="Ism"
            rules={[{ required: true, message: "Ism kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Familiya"
            rules={[{ required: true, message: "Familiya kiriting!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Email kiriting!" },
              { type: "email", message: "Email noto‘g‘ri!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;
