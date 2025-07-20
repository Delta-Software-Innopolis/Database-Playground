import crossImg from "@/assets/cross.svg";
import { Button } from "@/shared/ui/Button";
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
  const [capacity, setCapacity] = useState(10);
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
        <input
          value={capacity}
          onChange={(e) => setCapacity(+e.target.value)}
          type="number"
        />
        <button className={styles.createButton} onClick={onClick}>
          Create
        </button>
      </div>
    </div>
  );
}
