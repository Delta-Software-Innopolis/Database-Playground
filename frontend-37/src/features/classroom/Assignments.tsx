type Status = "Solved" | "In Progress";

interface Assignment {
  id: number;
  name: string;
  status: Status;
}

export function Assignments() {
  const assignments: Assignment[] = [
    {
      id: 1,
      name: "Lab 1 - Basic SQL Syntax",
      status: "Solved",
    },
    {
      id: 2,
      name: "Homework 1 - SELECT Practice",
      status: "In Progress",
    },
  ];

  return (
    <div>
      {assignments.map((assignment) => (
        <div key={assignment.id}>{assignment.name}</div>
      ))}
    </div>
  );
}
