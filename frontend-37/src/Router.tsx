import { Route, Routes } from "react-router";
import { Main } from "./features/main";
import { Playground } from "./features/playground";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}
