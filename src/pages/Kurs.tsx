import {
  ChevronRight,
  Proportions,
  Pen,
  Trash2,
  Snowflake,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";

const Kurs: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isFirstModalOpen, setIsFirstModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const [courseName, setCourseName] = useState("");

  const [courseDetails, setCourseDetails] = useState({
    _id: "",
    title: "",
    description: "",
    duration: "",
    price: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token topilmadi. Iltimos, login qiling.");

        const res = await fetch(
          `${BASE_URL}/api/course/get-courses?is_freeze=false`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Kurslarni olishda xatolik!");

        const data = await res.json();
        const apiCourses = Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.courses)
          ? data.courses
          : [];

        const localCourses = JSON.parse(
          localStorage.getItem("localCourses") || "[]"
        );

        const allCourses = [...localCourses, ...apiCourses];
        const uniqueCoursesMap = new Map();
        allCourses.forEach((course) => uniqueCoursesMap.set(course._id, course));

        setCourses(Array.from(uniqueCoursesMap.values()));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [BASE_URL]);

  const openFirstModal = () => {
    setCourseName("");
    setIsFirstModalOpen(true);
    setIsEditMode(false);
  };

  const closeFirstModal = () => {
    setIsFirstModalOpen(false);
  };

  const closeSecondModal = () => {
    setIsSecondModalOpen(false);
    setIsEditMode(false);
  };

  const handleFirstModalNext = () => {
    if (!courseName.trim()) {
      alert("Iltimos, kurs nomini kiriting.");
      return;
    }
    setCourseDetails({
      _id: "",
      title: courseName,
      description: "",
      duration: "",
      price: "",
    });
    setIsFirstModalOpen(false);
    setIsSecondModalOpen(true);
  };

  const handleSecondModalChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateCourse = () => {
    if (!courseDetails.title.trim()) {
      alert("Kurs nomi bo'sh bo'lishi mumkin emas!");
      return;
    }

    const newCourse = {
      _id: Date.now().toString(),
      title: courseDetails.title,
      description: courseDetails.description,
      duration: courseDetails.duration,
      price: courseDetails.price,
      studentsCount: 0,
    };

    const updatedCourses = [newCourse, ...courses];
    setCourses(updatedCourses);
    localStorage.setItem(
      "localCourses",
      JSON.stringify(
        updatedCourses.filter((course) => course._id.length > 10)
      )
    );

    setIsSecondModalOpen(false);
    setCourseDetails({
      _id: "",
      title: "",
      description: "",
      duration: "",
      price: "",
    });
  };

  const handleSaveEdit = () => {
    if (!courseDetails.title.trim()) {
      alert("Kurs nomi bo'sh bo'lishi mumkin emas!");
      return;
    }

    const updatedCourses = courses.map((course) =>
      course._id === courseDetails._id ? { ...courseDetails } : course
    );
    setCourses(updatedCourses);
    localStorage.setItem(
      "localCourses",
      JSON.stringify(
        updatedCourses.filter((course) => course._id.length > 10)
      )
    );

    setIsSecondModalOpen(false);
    setIsEditMode(false);
    setCourseDetails({
      _id: "",
      title: "",
      description: "",
      duration: "",
      price: "",
    });
  };

  const handleEdit = (course: any) => {
    setCourseDetails(course);
    setIsEditMode(true);
    setIsSecondModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const updated = courses.filter((course) => course._id !== id);
    setCourses(updated);
    localStorage.setItem(
      "localCourses",
      JSON.stringify(updated.filter((c) => c._id.length > 10))
    );
  };

  return (
    <div className="p-6 bg-black min-h-screen border-l-2">
      <h1 className="text-2xl font-bold text-white mb-6 border-b-2 pb-2 flex items-center gap-4">
        <Proportions /> Asosiy <ChevronRight /> Courses
      </h1>

      {loading && <p className="text-white">Yuklanmoqda...</p>}
      {error && <p className="text-red-500">Xatolik: {error}</p>}

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Kurslar</h3>
        <Button onClick={openFirstModal}>+ Kurs qo'shish</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course: any) => (
          <div
            key={course._id}
            className="bg-gray-900 text-white p-6 rounded-lg shadow-md flex flex-col justify-between"
          >
            <div>
              <h2 className="text-2xl font-semibold mb-2">{course.title}</h2>
              <p className="mb-1">
                <span className="font-semibold">Vaqti:</span>{" "}
                {course.duration || "Ma'lumot yo'q"}
              </p>
              {course.description && (
                <p className="mb-1">
                  <span className="font-semibold">Tavsif:</span> {course.description}
                </p>
              )}
              {course.price && (
                <p className="mb-4">
                  <span className="font-semibold">Narxi:</span> {course.price}
                </p>
              )}
              <p className="mb-4">
                <span className="font-semibold">Studentlar soni:</span>{" "}
                {course.studentsCount ?? course.students?.length ?? 0}
              </p>
            </div>

            <div className="flex justify-between space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="bg-blue-600 hover:bg-blue-700 transition rounded px-4 py-2 text-sm font-medium flex items-center gap-2"
              >
                <Pen size={16} /> Edit
              </button>

              <button
                onClick={() => handleDelete(course._id)}
                className="bg-red-600 hover:bg-red-700 transition rounded px-4 py-2 text-sm font-medium flex items-center gap-2"
              >
                <Trash2 size={16} /> Delete
              </button>

              <button
                onClick={() => alert(`Muzlatish bosildi, kurs ID: ${course._id}`)}
                className="bg-yellow-600 hover:bg-yellow-700 transition rounded px-4 py-2 text-sm font-medium flex items-center gap-2"
              >
                <Snowflake size={16} /> Muzlatish
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={isEditMode ? "Kursni tahrirlash" : "Yangi kurs yaratish"}
        open={isSecondModalOpen}
        onCancel={closeSecondModal}
        footer={[
          <Button key="cancel" onClick={closeSecondModal}>
            Bekor qilish
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={isEditMode ? handleSaveEdit : handleCreateCourse}
          >
            {isEditMode ? "Saqlash" : "Yaratish"}
          </Button>,
        ]}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="font-semibold">
              Kurs nomi
            </label>
            <Input
              name="title"
              id="title"
              value={courseDetails.title}
              onChange={handleSecondModalChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="font-semibold">
              Tavsif
            </label>
            <Input.TextArea
              name="description"
              id="description"
              rows={3}
              value={courseDetails.description}
              onChange={handleSecondModalChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="duration" className="font-semibold">
              Vaqti
            </label>
            <Input
              name="duration"
              id="duration"
              value={courseDetails.duration}
              onChange={handleSecondModalChange}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="font-semibold">
              Narxi
            </label>
            <Input
              name="price"
              id="price"
              value={courseDetails.price}
              onChange={handleSecondModalChange}
            />
          </div>
        </div>
      </Modal>

      <Modal
        title="Yangi kurs nomini kiriting"
        open={isFirstModalOpen}
        onCancel={closeFirstModal}
        onOk={handleFirstModalNext}
        okText="Keyingi"
      >
        <Input
          placeholder="Kurs nomi"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default Kurs;
