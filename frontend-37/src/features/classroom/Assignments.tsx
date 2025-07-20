import goToImg from "@/assets/chooseClassroom.svg";
import styles from "./Assignments.module.css";

type Status = "Solved" | "In Progress";

interface Assignment {
  id: number;
  name: string;
  status: Status;
}

export function Assignments() {
  const assignments: Assignment[] = [
    {
      id: 1,
      name: "Lab 1 - Basic SQL Syntax",
      status: "Solved",
    },
    {
      id: 2,
      name: "Homework 1 - SELECT Practice",
      status: "In Progress",
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerCol}>Assignment</div>
        <div className={styles.headerCol}>Status</div>
      </div>
      {assignments.map((assignment) => (
        <div className={styles.assignment} key={assignment.id}>
          <div
            className={styles.assignmentCol}
            style={{ color: "rgba(102, 102, 102, 1)" }}
          >
            {assignment.name}
          </div>
          <div
            className={styles.assignmentCol}
            style={{
              color: `${assignment.status === "Solved" ? "rgba(0, 188, 50, 1)" : "rgba(102, 102, 102, 1)"}`,
            }}
          >
            {assignment.status}
          </div>
          <img src={goToImg} style={{ position: "absolute", right: 25 }} />
        </div>
      ))}
    </div>
  );
}
