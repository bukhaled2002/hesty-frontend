import { create } from 'zustand';

interface LectureState {
  lecture: any;
  setLecture: (lecture: any) => void;
}

export const useLectureStore = create<LectureState>((set) => ({
  lecture: null,
  setLecture: (lecture) => set({ lecture }),
}));
