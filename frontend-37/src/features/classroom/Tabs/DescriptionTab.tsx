import { classroomStore } from "../store";

export function DescriptionTab() {
  const { classroom } = classroomStore();

  return (
    <div style={{ fontSize: 16, color: "#1f1f1f" }}>
      {classroom?.description}
    </div>
  );
}
