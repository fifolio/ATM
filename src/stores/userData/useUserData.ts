import type { Models } from 'appwrite';
import { create } from 'zustand';

interface UserData {
    userData: Models.User<Models.Preferences> | null;
    setUserData: (state: Models.User<Models.Preferences>) => void;

    updateUserData: boolean;
    setUpdateUserData: (state: boolean) => void;
}

const useUserData = create<UserData>((set) => ({
    userData: null,
    setUserData: (state) => set({ userData: state }),

    updateUserData: false,
    setUpdateUserData: (state) => set({ updateUserData: state }),
}));

export default useUserData;
