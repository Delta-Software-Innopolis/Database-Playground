import { create } from "zustand";
import { Classroom } from "./types";

interface ClassroomStore {
  classroom: Classroom | null;
  updateClassroom: (newClassroom: Classroom) => void;
}

export const classroomStore = create<ClassroomStore>((set) => ({
  classroom: null,
  updateClassroom: (newClassroom) => set({ classroom: newClassroom }),
}));
