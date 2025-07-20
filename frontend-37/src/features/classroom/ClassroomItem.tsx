import chooseClassroomImg from "@/assets/chooseClassroom.svg";
import styles from "./ClassroomItem.module.css";
import { Classroom } from "./types";

interface ClassroomItemProps {
  classroom: Classroom;
  onClick: (classroom: Classroom) => void;
}

export function ClassroomItem({ classroom, onClick }: ClassroomItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.itemCol}>{classroom.title}</div>
      <div className={styles.itemCol}>{classroom.teacher.email}</div>
      <button
        className={styles.chooseButton}
        onClick={() => onClick(classroom)}
      >
        <img style={{ width: 25, height: 25 }} src={chooseClassroomImg} />
      </button>
    </div>
  );
}
