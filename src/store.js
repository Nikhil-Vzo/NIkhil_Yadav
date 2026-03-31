import { create } from 'zustand';

export const useStore = create((set) => ({
  // App Phase: 'birth' -> 'transition' -> 'universe' -> 'project'
  phase: 'birth',
  setPhase: (phase) => set({ phase }),
  
  // Track cursor position for shaders/physics
  cursorTarget: [0, 0, 0],
  setCursorTarget: (x, y, z) => set({ cursorTarget: [x, y, z] }),

  // Current active project portal
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
}));
