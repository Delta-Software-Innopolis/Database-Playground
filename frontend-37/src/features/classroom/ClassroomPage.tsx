import { TopBar } from "@/shared/ui/TopBar";
import { api } from "@/shared/utils/api";
import { useEffect } from "react";
import { useParams } from "react-router";
import styles from "./ClassroomPage.module.css";
import { Assignments } from "./Assignments";
import { ClassroomTabs } from "./Tabs";
import { classroomStore } from "./store";
import { Classroom } from "./types";

export function ClassroomPage() {
  const { classroom, updateClassroom } = classroomStore();
  const { id } = useParams();

  useEffect(() => {
    const run = async () => {
      const classroom = await api<Classroom>({ path: `classroom/${id}/` });
      updateClassroom(classroom);
    };

    run();
  }, []);

  if (!classroom) return;

  return (
    <div>
      <TopBar className={styles.topbar} />
      <div className={styles.content}>
        <div className={styles.classroom}>
          <div className={styles.title}>{classroom.title}</div>
          <div className={styles.teacher} style={{ marginBottom: 10 }}>
            <span className={styles.by}>By</span>{" "}
            <span className={styles.email}>{classroom.teacher.email}</span>
          </div>
          <ClassroomTabs />
        </div>
        <div className={styles.assignments}>
          <Assignments />
        </div>
      </div>
    </div>
  );
}
