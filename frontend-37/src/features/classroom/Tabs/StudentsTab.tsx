import { api } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./StudentsTab.module.css";
import { classroomStore } from "../store";
import { User } from "../types";
import { StudentsList } from "./StudentsList";

interface StudentsResponse {
  classroomId: number;
  students: User[];
}

export function StudentsTab() {
  const { classroom } = classroomStore();
  const [students, setStudents] = useState<User[] | null>(null);

  useEffect(() => {
    if (!classroom) return;
    const run = async () => {
      const { students } = await api<StudentsResponse>({
        path: `/classroom/${classroom.id}/students`,
      });
      setStudents(students);
    };

    run();
  }, []);

  if (!students || !classroom) return;

  const onCopyLink = () => {
    navigator.clipboard.writeText(
      `https://dbpg.ru/classroom/enroll/${classroom.invite}`
    );
    toast.success("Copied link to clipboard");
  };

  return (
    <div style={{ height: "100%" }}>
      <div className={styles.top}>
        <div className={styles.capacity}>
          <span style={{ color: "#666666" }}>Capacity: </span>
          <span style={{ color: "#6968ff" }}>
            {students.length}/{classroom.capacity}
          </span>
        </div>
        <div>
          <button className={styles.linkBtn} onClick={onCopyLink}>
            Get Enrollment Link
          </button>
        </div>
      </div>
      <StudentsList students={students} />
    </div>
  );
}
