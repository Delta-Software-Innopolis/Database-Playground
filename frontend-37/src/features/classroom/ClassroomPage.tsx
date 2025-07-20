import { TopBar } from "@/shared/ui/TopBar";
import { api } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "./ClassroomPage.module.css";
import { Classroom, User } from "./types";

interface StudentsResponse {
  classroomId: number;
  students: User[];
}

export function ClassroomPage() {
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [students, setStudents] = useState<User[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const run = async () => {
      const classroom = await api<Classroom>({ path: `classroom/${id}/` });
      setClassroom(classroom);

      const students = await api<StudentsResponse>({
        path: `/classroom/${id}/students`,
      });
      console.log(students, "students json");
      setStudents(students.students);
    };

    run();
  }, []);

  if (!classroom) return;

  return (
    <div>
      <TopBar className={styles.topbar} />
      <div className={styles.content}>
        <div className={styles.title}>{classroom.title}</div>
        <div className={styles.description}>{classroom.description}</div>
        <div>capacity: {classroom.capacity}</div>
        <div>invite: {classroom.invite}</div>
        <div>
          {students?.map((student) => (
            <div>{student.username}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
