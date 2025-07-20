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
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.icon}
        >
          <path
            d="M14.5 12.75L15.2071 12.0429L15.9142 12.75L15.2071 13.4571L14.5 12.75ZM4.5 13.75C3.94771 13.75 3.5 13.3023 3.5 12.75C3.5 12.1977 3.94771 11.75 4.5 11.75V13.75ZM8.5 6.75L9.20711 6.04289L15.2071 12.0429L14.5 12.75L13.7929 13.4571L7.79289 7.45711L8.5 6.75ZM14.5 12.75L15.2071 13.4571L9.20711 19.4571L8.5 18.75L7.79289 18.0429L13.7929 12.0429L14.5 12.75ZM14.5 12.75V13.75H4.5V12.75V11.75H14.5V12.75Z"
            fill="currentColor"
          />
          <path
            d="M20.5 5.75L20.5 19.75"
            stroke="currentColor"
            stroke-width="2"
          />
        </svg>
      </button>
    </div>
  );
}
