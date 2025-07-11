import { create } from 'zustand';
import type { useResetPassword_interface } from '../../interfaces';

const useResetPassword = create<useResetPassword_interface>((set) => ({
    resetPasswordStep: 0,
    setResetPasswordStep: (state) => set({ resetPasswordStep: state }),

    resetPasswordData: {
        email: null,
    },
    setResetPasswordData: (partial) =>
        set((state) => ({
            resetPasswordData: {
                ...state.resetPasswordData,
                ...partial,
            },
        })),

    resetPasswordError: null,
    setResetPasswordError: (state) => set({ resetPasswordError: state }),
}));

export default useResetPassword;
