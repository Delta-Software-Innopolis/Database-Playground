import { User } from "../types";

interface StudentsListProps {
  students: User[];
}

export function StudentsList({ students }: StudentsListProps) {
  return (
    <div>
      {students.map((student) => (
        <div key={student.id}>{student.username}</div>
      ))}
    </div>
  );
}
