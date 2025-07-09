interface LoginUserData {
    email: string | null,
    password: string | null,
}

export default interface useLogin_interface {
    loginStep: number | null;
    setLoginStep: (state: number | null) => void;
    loginUserData: LoginUserData;
    setLoginUserData: (state: Partial<LoginUserData>) => void;

    loginError: string | null,
    setLoginError: (state: string | null) => void;
}