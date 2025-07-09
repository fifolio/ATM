import { create } from 'zustand';
import type { useLogin_interface } from '../../interfaces';


const useLogin = create<useLogin_interface>((set) => ({
    loginStep: null,
    setLoginStep: (state) => set({ loginStep: state }),

    loginUserData: {
        email: null,
        password: null,
    },

    setLoginUserData: (partial) =>
        set((state) => ({
            loginUserData: {
                ...state.loginUserData,
                ...partial,
            }
        }))

}));

export default useLogin;