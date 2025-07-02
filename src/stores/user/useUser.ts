import { create } from 'zustand';

interface User {
    isLoggedin: boolean | undefined;
    setIsLoggedin: (state: boolean) => void;
}

const useUser = create<User>((set) => ({
    isLoggedin: undefined,
    setIsLoggedin: (state) => set({ isLoggedin: state })
}));

export default useUser;