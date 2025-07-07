interface SignupUserData {
    username: string | null,
    email: string | null,
    password: string | null,
    ConfirmPassword: string | null,
    acceptTerms: string | null,
}

export default interface useSignup_interface {
    signupStep: number | null;
    setSignupStep: (state: number | null) => void;
    signupUserData: SignupUserData;
    setSignupUserData: (state: Partial<SignupUserData>) => void;

}