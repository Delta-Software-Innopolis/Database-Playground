import { Route, Routes } from "react-router";
import { ClassroomPage } from "./features/classroom/ClassroomPage";
import { Enroll } from "./features/classroom/Enroll";
import { Main } from "./features/main";
import { Playground } from "./features/playground";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/playground" element={<Playground />} />
      <Route path="/classroom/:id" element={<ClassroomPage />} />
      <Route path="/classroom/enroll/:id" element={<Enroll />} />
    </Routes>
  );
}
