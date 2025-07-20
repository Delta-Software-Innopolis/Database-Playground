import styles from "./StudentsList.module.css";
import { User } from "../types";

interface StudentsListProps {
  students: User[];
}

export function StudentsList({ students }: StudentsListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerCol}>Username</div>
        <div className={styles.headerCol}>Email</div>
      </div>
      <div className={styles.studentsList}>
        {students.map((student) => (
          <div className={styles.student} key={student.id}>
            <div
              className={styles.studentCol}
              style={{ color: "rgba(102, 102, 102, 1)" }}
            >
              {student.username}
            </div>
            <div
              className={styles.studentCol}
              style={{ color: "rgba(169, 169, 255, 1)" }}
            >
              {student.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
