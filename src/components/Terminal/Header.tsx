import { useLogin, useSignup } from "../../stores";

export default function Header() {

    const { signupStep } = useSignup();
    const { loginStep } = useLogin();

    return (
        <div className="mb-5">
            <p>Welcome to Automission.ai (ATM) v2.0.0</p>
            <p>AI-powered cryptocurrency price movement prediction system.</p>
            {signupStep == null && loginStep == null && (
                <p>Type 'atm help' for commands, 'atm readme' for project info.</p>
            )}
        </div>
    )
}
