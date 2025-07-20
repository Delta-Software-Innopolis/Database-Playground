import crossImg from "@/assets/cross.svg";
import { api } from "@/shared/utils/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CreateClassroom.module.css";
import { Classroom } from "./types";

interface CreateClassroomProps {
  onClose: () => void;
}

export function CreateClassroom({ onClose }: CreateClassroomProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState(40);
  const navigate = useNavigate();

  const onClick = async () => {
    const json = await api<Classroom>({
      path: "classroom/",
      method: "POST",
      body: {
        title,
        description,
        capacity,
      },
    });

    navigate(`/classroom/${json.id}`);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        Create Classroom
        <div style={{ position: "absolute", right: 10, top: 12 }}>
          <img src={crossImg} onClick={onClose} style={{ cursor: "pointer" }} />
        </div>
      </div>
      <div style={{ paddingLeft: 20, paddingRight: 20 }}>
        <input
          className={styles.titleInput}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Title"
          required
        />
        <textarea
          className={styles.descriptionInput}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <div className={styles.capacityMegaWrapper}>
          <div className={styles.capacityWrapper}>
            <input
              value={capacity}
              onChange={(e) => setCapacity(+e.target.value)}
              type="number"
              className={styles.capacity}
            />
            <button
              className={styles.incBtn}
              onClick={() => setCapacity((prev) => prev + 1)}
            >
              +
            </button>
            <button
              className={styles.incBtn}
              onClick={() => setCapacity((prev) => prev - 1)}
            >
              -
            </button>
          </div>
          <div className={styles.capacityLabel}>Number of students</div>
        </div>
        <button className={styles.createButton} onClick={onClick}>
          Create
        </button>
      </div>
    </div>
  );
}
