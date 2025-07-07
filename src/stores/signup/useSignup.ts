import { create } from 'zustand';
import type { useSignup_interface } from '../../interfaces';


const useSignup = create<useSignup_interface>((set) => ({
    signupStep: null,
    setSignupStep: (state) => set({ signupStep: state }),

    signupUserData: {
        username: null,
        email: null,
        password: null,
        ConfirmPassword: null,
        acceptTerms: null,
    },

    setSignupUserData: (partial) =>
        set((state) => ({
            signupUserData: {
                ...state.signupUserData,
                ...partial,
            }
        }))

}));

export default useSignup;