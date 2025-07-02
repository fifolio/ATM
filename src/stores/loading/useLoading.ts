import { create } from 'zustand';

interface Loading {
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
}

const useLoading = create<Loading>((set) => ({
    isLoading: true,
    setIsLoading: (state) => set({ isLoading: state })
}));

export default useLoading;