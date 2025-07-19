import { Button } from "@/shared/ui/Button";
import { api } from "@/shared/utils/api";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Classroom } from "./types";

export function CreateClassroom() {
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
    <div>
      <div>CREATE CLASSROOM</div>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
      />{" "}
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
      />
      <input
        value={capacity}
        onChange={(e) => setCapacity(+e.target.value)}
        type="number"
      />
      <Button onClick={onClick}>create</Button>
    </div>
  );
}
