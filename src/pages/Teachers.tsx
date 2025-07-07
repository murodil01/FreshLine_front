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

interface TeacherFormValues {
  firstName: string;
  lastName: string;
  email: string;
}

const Teachers: React.FC = () => {
  const [data, setData] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [searchValue, setSearchValue] = useState("");

  const token = localStorage.getItem("token") || "";
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [form] = Form.useForm<TeacherFormValues>();
  const [editForm] = Form.useForm<TeacherFormValues>();

  const fetchTeachers = async (search = "") => {
    setLoading(true);
    try {
      const url = search
        ? `${baseUrl}/api/teacher/return-teacher`
        : `${baseUrl}/api/teacher/get-all-teachers`;

      const options: RequestInit = {
        method: search ? "POST" : "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        ...(search && { body: JSON.stringify({ search }) }),
      };

      const res = await fetch(url, options);
      if (!res.ok) throw new Error("Xatolik yuz berdi");

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
    } catch {
      message.error("Ma'lumotlarni olishda xatolik");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => fetchTeachers(searchValue.trim()), 400);
    return () => clearTimeout(delay);
  }, [searchValue]);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAddTeacher = async (values: TeacherFormValues) => {
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

      if (!res.ok) throw new Error();
      message.success("Ustoz qo'shildi");
      form.resetFields();
      setIsAddModalOpen(false);
      fetchTeachers();
    } catch {
      message.error("Qo'shishda xatolik");
    }
  };

  const handleEditTeacher = async (values: TeacherFormValues) => {
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

      if (!res.ok) throw new Error();
      message.success("Ustoz tahrirlandi");
      editForm.resetFields();
      setIsEditModalOpen(false);
      setEditingTeacher(null);
      fetchTeachers();
    } catch {
      message.error("Tahrirlashda xatolik");
    }
  };

  const handleDeleteTeacher = (teacher: Teacher) => {
    Modal.confirm({
      title: "Ustozni o'chirish",
      content: `${teacher.firstName} ${teacher.lastName} ni o'chirmoqchimisiz?`,
      okText: "Ha",
      cancelText: "Yo'q",
      okType: "danger",
      onOk: async () => {
        try {
          const res = await fetch(`${baseUrl}/api/teacher/delete-teacher/${teacher.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error();
          message.success("Ustoz o'chirildi");
          fetchTeachers();
        } catch {
          message.error("O'chirishda xatolik");
        }
      },
    });
  };

  const columns = [
    {
      title: <span className="text-white">Ism</span>,
      dataIndex: "firstName",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Familiya</span>,
      dataIndex: "lastName",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Email</span>,
      dataIndex: "email",
      render: (text: string) => <span className="text-white">{text}</span>,
    },
    {
      title: <span className="text-white">Rol</span>,
      dataIndex: "role",
      render: (role: string) => <Tag color="#00AE4B">{role}</Tag>,
    },
    {
      title: <span className="text-white">Holat</span>,
      dataIndex: "status",
      render: (status: string) => (
        <Tag color={status === "Active" ? "#00AE4B" : "red"}>{status}</Tag>
      ),
    },
    {
      title: "",
      key: "actions",
      render: (_: unknown, record: Teacher) => {
        const menu = (
          <Menu
            items={[
              {
                key: "edit",
                icon: <EditOutlined className="text-blue-500" />,
                label: "Tahrirlash",
              },
              {
                key: "delete",
                icon: <DeleteOutlined className="text-red-500" />,
                label: "O'chirish",
              },
            ]}
            onClick={({ key }) => {
              if (key === "edit") {
                setEditingTeacher(record);
                editForm.setFieldsValue(record);
                setIsEditModalOpen(true);
              } else if (key === "delete") {
                handleDeleteTeacher(record);
              }
            }}
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
    <div className="p-6 bg-white min-h-screen border-l-2">
      <div className="flex items-center gap-3 border-b border-gray-300 pb-3 mb-5">
        <NotebookTabs className="text-[#00AE4B]" />
        <h2 className="text-[#00AE4B] text-2xl font-semibold">Asosiy</h2>
        <ChevronRight className="text-[#00AE4B]" />
        <h2 className="text-[#00AE4B] text-2xl font-semibold">Teachers</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-[#00AE4B] text-xl font-bold">Ustozlar ro'yxati</h1>
        <div className="flex items-center gap-4">
          <Input.Search
            placeholder="Ustozni qidirish..."
            allowClear
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: 250 }}
            value={searchValue}
          />
          <Button
            style={{ backgroundColor: "#00AE4B", color: "white", border: "none" }}
            icon={<PlusOutlined />}
            onClick={() => setIsAddModalOpen(true)}
          >
            Ustoz qo'shish
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        className="shadow-md"
        bordered
      />

      <Modal
        title="Yangi ustoz qo'shish"
        open={isAddModalOpen}
        onCancel={() => setIsAddModalOpen(false)}
        onOk={() => form.submit()}
        okText="Qo'shish"
        cancelText="Bekor qilish"
        okButtonProps={{ style: { backgroundColor: "#00AE4B", borderColor: "#00AE4B" } }}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTeacher}>
          <Form.Item name="firstName" label="Ism" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="lastName" label="Familiya" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}> <Input /> </Form.Item>
        </Form>
      </Modal>

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
        okButtonProps={{ style: { backgroundColor: "#00AE4B", borderColor: "#00AE4B" } }}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditTeacher}>
          <Form.Item name="firstName" label="Ism" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="lastName" label="Familiya" rules={[{ required: true }]}> <Input /> </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}> <Input /> </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Teachers;*/

const Teachers = () => {
  return (
    <div>
      Teachers
    </div>
  )
}

export default Teachers
