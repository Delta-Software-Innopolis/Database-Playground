import { api } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import styles from "./ClassroomList.module.css";
import { ClassroomItem } from "./ClassroomItem";
import { Classroom } from "./types";

interface ClassroomListResponse {
  classrooms: Classroom[];
}

interface ClassroomListProps {
  onCreateClassroom: () => void;
  onClose: () => void;
}

export function ClassroomList({
  onCreateClassroom,
  onClose,
}: ClassroomListProps) {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      try {
        const json = await api<ClassroomListResponse>({ path: "classroom/" });
        setClassrooms(json.classrooms);
        console.log(json, "classroom list json");
      } catch {
        toast.error("Please log in first.");
        onClose();
      }
    };

    run();
  }, []);

  const onClick = (classroom: Classroom) => {
    navigate(`/classroom/${classroom.id}`);
  };

  return (
    <div>
      <div className={styles.buttonsPanel}>
        <div style={{ display: "flex", verticalAlign: "middle" }}>
          <button className={styles.backButton} onClick={onClose}>
            Back
          </button>
          <button
            className={styles.createClassButton}
            onClick={onCreateClassroom}
          >
            Create Classroom
          </button>
        </div>
        <span style={{ paddingTop: 8 }}>Enter Classroom</span>
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.header}>
          <div className={styles.headerCol}>Classroom Title</div>
          <div className={styles.headerCol}>Teacher</div>
        </div>
        <div style={{ height: 595, overflow: "auto" }}>
          {classrooms.map((classroom) => (
            <ClassroomItem
              key={classroom.id}
              classroom={classroom}
              onClick={onClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
