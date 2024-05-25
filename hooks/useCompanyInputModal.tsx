import { create } from "zustand";

interface CompanyInputModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCompanyInputModal = create<CompanyInputModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCompanyInputModal;
