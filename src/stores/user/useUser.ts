import { create } from 'zustand';

interface User {
    isLoggedin: boolean | undefined;
    setIsLoggedin: (state: boolean) => void;

    userId: string | null;
    setUserId: (state: string | null) => void;
}

const useUser = create<User>((set) => ({
    isLoggedin: undefined,
    setIsLoggedin: (state) => set({ isLoggedin: state }),

    userId: null,
    setUserId: (state) => set({ userId: state }),
}));

export default useUser;
