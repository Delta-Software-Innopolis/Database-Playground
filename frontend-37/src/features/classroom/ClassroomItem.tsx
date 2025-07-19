import { Classroom } from "./types";

interface ClassroomItemProps {
  classroom: Classroom;
  onClick: (classroom: Classroom) => void;
}

export function ClassroomItem({ classroom, onClick }: ClassroomItemProps) {
  return <div onClick={() => onClick(classroom)}>{classroom.title}</div>;
}
