import { useEffect, useRef, useState } from "react";
import { useLoading, useLogin, useSignup, useUser } from "../../../stores";
import { signup } from "../../../apis/backend/auth/signup";


export default function SignupInput() {

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoggedin } = useUser();
    const { isLoading, setIsLoading } = useLoading();
    const { signupStep, setSignupStep, signupUserData, setSignupUserData, setSignupError } = useSignup();
    const { setLoginStep } = useLogin();

    const [input, setInput] = useState<string>("");

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

        // Banned commands
        const bannedCommands = [
            'atm help',
            'atm clear',
            'atm login',
            'atm signup',
            'atm logout',
            'atm details',
            'atm guide',
            'atm readme',
            'atm whoami'
        ]


        if (event.key === 'Escape') {
            setSignupStep(null);
            setSignupUserData({
                username: null,
                email: null,
                password: null,
                ConfirmPassword: null,
                acceptTerms: null,
            })
            setInput('');
            setSignupError(null)
            return;
        }

        if (event.ctrlKey && event.key.toLowerCase() === "c") {
            return;
        }


        if (event.key === 'Enter') {

            // Username validation
            if (signupStep === 0) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim().length < 3 || input.trim().length > 15 || !/^[a-zA-Z_]+$/.test(input.trim())) {
                    return;
                }
                setSignupUserData({ username: input.trim().toLowerCase() });
                setSignupStep(1);
                setInput("");
            }


            // Email validation
            if (signupStep === 1) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim())) {
                    return;
                }
                setSignupUserData({ email: input.trim().toLowerCase() });
                setSignupStep(2);
                setInput("");
            }

            // Password validation
            if (signupStep === 2) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim().length < 8) {
                    return;
                }
                setSignupUserData({ password: input.trim() });
                setSignupStep(3);
                setInput("");
            }

            // Confirm Password validation
            if (signupStep === 3) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim().length < 8 || input.trim() !== signupUserData.password) {
                    return;
                }
                setSignupStep(4);
                setSignupUserData({ ConfirmPassword: input.trim() });
                setInput("");
            }

            // Accept the Terms validation
            if (signupStep === 4) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim() === 'read') {
                    window.open('https://drive.google.com/file/d/1RWhzdw2ChOz18Sx5avUwOA2ulCcejkZl/', '_blank');
                } else if (input.trim() === 'agree') {
                    setSignupStep(5);
                    setSignupUserData({ acceptTerms: input.trim() });
                    setInput("");
                } else {
                    return;
                }
            }

            // Handle Data Submit
            async function handleSubmit() {
                setIsLoading(true);

                const response = await signup({
                    email: signupUserData.email || "",
                    password: signupUserData.password || "",
                    username: signupUserData.username || "",
                });


                if (response.success) {
                    // Signup successful
                    setSignupError(null);
                    setSignupStep(6);
                    setInput("");
                    setSignupUserData({
                        username: null,
                        email: null,
                        password: null,
                        ConfirmPassword: null,
                        acceptTerms: null,
                    })
                } else {
                    // Signup failed
                    setSignupError((response.error as Error).message);

                }

                setIsLoading(false);
            }


            if (signupStep === 5 && input.trim().toLowerCase() === "atm submit") {
                handleSubmit();
            }

            // handle 'ATM Update' 
            if (signupStep === 5) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                switch (input.trim()) {
                    case 'atm update username':
                        setSignupStep(0);
                        setInput("");
                        break;
                    case 'atm update email':
                        setSignupStep(1);
                        setInput("");
                        break;
                    case 'atm update password':
                        setSignupStep(2);
                        setInput("");
                        break;
                    case 'atm update confirm password':
                        setSignupStep(3);
                        setInput("");
                        break;
                    case 'atm update accept terms':
                        setSignupStep(4);
                        setInput("");
                        break;
                    default:
                        break;
                }
            }

            if (signupStep === 6 && input.trim().toLowerCase() === "atm login") {
                setSignupStep(null)
                setLoginStep(0)
            }
        };

    }

    useEffect(() => {
        const handleBodyClick = () => {
            if (inputRef.current) {
                inputRef.current.focus();
            }
        };

        document.body.addEventListener('click', handleBodyClick);

        return () => {
            document.body.removeEventListener('click', handleBodyClick);
        };
    }, []);


    if (isLoggedin === undefined || isLoading) return (
        <div className="flex space-x-1">
            <div className="text-orange-400">Please wait</div>
            <span className="absolute ml-[110px] animate-spin text-orange-400">█</span>
        </div>
    )

    return (
        <div className="flex justify-between space-x-1">
            <div className="m-0 p-0 flex">
                <div className="text-orange-400">
                    {
                        signupStep === 0 ? 'Enter a username:~$' :
                            signupStep === 1 ? 'Enter your email address:~$' :
                                signupStep === 2 ? 'Create a password:~$' :
                                    signupStep === 3 ? 'Confirm your password:~$' :
                                        signupStep === 4 ? "Type 'read' to view the Terms of Use and Privacy Policy, or type 'agree' to accept and continue:~$" :
                                            signupStep === 5 ? "Update your info, or type 'atm submit' to signup your account:~$" :
                                                signupStep === 6 ? "Type 'atm login' to activate your account:~$" :
                                                    null
                    }
                </div>
                <input
                    ref={inputRef}
                    type={
                        signupStep === 1 ? 'email' :
                            signupStep === 2 ? 'password' :
                                signupStep === 3 ? 'password' :
                                    'text'
                    }
                    value={input.toLowerCase()}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-orange-200 font-mono pl-2 min-w-[400px]"
                    autoFocus
                />
            </div>
            <span className="animate-pulse duration-10 text-orange-400">{input.length === 0 ? "█" : ""}</span>
        </div>
    );
}