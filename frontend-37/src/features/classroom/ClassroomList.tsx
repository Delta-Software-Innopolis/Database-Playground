import { Button } from "@/shared/ui/Button";
import { api } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
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
      <div>CLASSROOM LIST BRO</div>
      <div>
        {classrooms.map((classroom) => (
          <ClassroomItem
            key={classroom.id}
            classroom={classroom}
            onClick={onClick}
          />
        ))}
      </div>
      <Button onClick={onCreateClassroom}>create classroom</Button>
    </div>
  );
}
