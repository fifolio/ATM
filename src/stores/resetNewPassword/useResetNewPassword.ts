import { create } from 'zustand';
import type { useResetNewPassword_interface } from '../../interfaces';

const useResetNewPassword = create<useResetNewPassword_interface>((set) => ({
    resetNewPasswordStep: 0,
    setResetNewPasswordStep: (state) => set({ resetNewPasswordStep: state }),

    resetNewPasswordData: {
        newPassword: null,
        confirmNewPassword: false,
        userId: null,
        secret: null,
    },
    setResetNewPasswordData: (partial) =>
        set((state) => ({
            resetNewPasswordData: {
                ...state.resetNewPasswordData,
                ...partial,
            },
        })),

    resetNewPasswordError: null,
    setResetNewPasswordError: (state) => set({ resetNewPasswordError: state }),

    resetNewPasswordScreenLoadingState: true,
    setResetNewPasswordScreenLoadingState: (state) => set({ resetNewPasswordScreenLoadingState: state }),

}));

export default useResetNewPassword;
