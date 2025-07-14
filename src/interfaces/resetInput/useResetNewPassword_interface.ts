interface ResetNewPasswordData {
    newPassword: string | null;
    confirmNewPassword: boolean | null;
    userId: string | null;
    secret: string | null;
}

export default interface useResetNewPassword_interface {
    resetNewPasswordStep: number | null;
    setResetNewPasswordStep: (state: number | null) => void;

    resetNewPasswordData: ResetNewPasswordData;
    setResetNewPasswordData: (state: Partial<ResetNewPasswordData>) => void;

    resetNewPasswordError: string | null;
    setResetNewPasswordError: (state: string | null) => void;

    resetNewPasswordScreenLoadingState: boolean;
    setResetNewPasswordScreenLoadingState: (state: boolean) => void;
}