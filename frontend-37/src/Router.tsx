import { Route, Routes } from "react-router";
import { Main } from "./features/main";
import { Playground } from "./features/playground";
import { TemplateChoice } from "./features/template-choice";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/template" element={<TemplateChoice />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}
