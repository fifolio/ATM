interface ResetPasswordData {
    email: string | null;
}

export default interface useResetPassword_interface {
    resetPasswordStep: number | null;
    setResetPasswordStep: (state: number | null) => void;

    resetPasswordData: ResetPasswordData;
    setResetPasswordData: (state: Partial<ResetPasswordData>) => void;

    resetPasswordError: string | null;
    setResetPasswordError: (state: string | null) => void;
}