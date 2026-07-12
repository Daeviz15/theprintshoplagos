import { create } from 'zustand';

interface ModalState {
  isContactModalOpen: boolean;
  setContactModalOpen: (isOpen: boolean) => void;
  isSignUpModalOpen: boolean;
  setSignUpModalOpen: (isOpen: boolean) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  isContactModalOpen: false,
  setContactModalOpen: (isOpen) => set({ isContactModalOpen: isOpen }),
  isSignUpModalOpen: false,
  setSignUpModalOpen: (isOpen) => set({ isSignUpModalOpen: isOpen }),
}));
