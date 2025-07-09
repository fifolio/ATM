import type { Models } from 'appwrite';
import { create } from 'zustand';

interface UserData {
    userData: Models.User<Models.Preferences> | null;
    setUserData: (state: Models.User<Models.Preferences>) => void;
}

const useUserData = create<UserData>((set) => ({
    userData: null,
    setUserData: (state) => set({ userData: state })
}));

export default useUserData;
