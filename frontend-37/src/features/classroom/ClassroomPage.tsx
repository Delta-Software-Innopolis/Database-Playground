import { api } from "@/shared/utils/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Classroom } from "./types";

export function ClassroomPage() {
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const run = async () => {
      const json = await api<Classroom>({ path: `classroom/${id}/` });
      setClassroom(json);
    };

    run();
  }, []);

  if (!classroom) return;

  return (
    <div>
      <div>{classroom.title}</div>
      <div>{classroom.description}</div>
      <div>capacity: {classroom.capacity}</div>
      <div>invite: {classroom.invite}</div>
    </div>
  );
}
