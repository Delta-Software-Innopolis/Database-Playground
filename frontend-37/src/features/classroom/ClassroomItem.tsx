import chooseClassroomImg from "@/assets/chooseClassroom.svg";
import styles from "./ClassroomItem.module.css";
import { Classroom } from "./types";

interface ClassroomItemProps {
  classroom: Classroom;
  onClick: (classroom: Classroom) => void;
}

export function ClassroomItem({ classroom, onClick }: ClassroomItemProps) {
  return (
    <div className={styles.item} onClick={() => onClick(classroom)}>
      <div className={styles.itemCol}>{classroom.title}</div>
      <div className={styles.itemCol}>{classroom.teacher.email}</div>
      <button className={styles.chooseButton}>
        <img style={{ width: 25, height: 25 }} src={chooseClassroomImg} />
      </button>
    </div>
  );
}
