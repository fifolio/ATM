import { useEffect, useRef, useState } from "react";
import { useLoading, useSignup, useUser } from "../../../stores";
import { signup } from "../../../apis/backend/auth/signup";


export default function SignupInput() {

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoggedin } = useUser();
    const { isLoading, setIsLoading } = useLoading();
    const { signupStep, setSignupStep, signupUserData, setSignupUserData } = useSignup();

    const [input, setInput] = useState<string>("");

    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {


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
            return;
        }

        if (event.ctrlKey && event.key.toLowerCase() === "c") {
            return;
        }

        if (
            input.trim() === '' ||
            input.trim() === 'atm help' ||
            input.trim() === 'atm clear' ||
            input.trim() === 'atm login' ||
            input.trim() === 'atm signup' ||
            input.trim() === 'atm logout' ||
            input.trim() === 'atm details' ||
            input.trim() === 'atm guide' ||
            input.trim() === 'atm readme' ||
            input.trim() === 'atm whoami'
        ) {
            return
        }

        if (input.trim() === 'start') {
            setSignupStep(1);
            setInput(""); // Clear the input after
        }

        if (event.key === 'Enter') {

            // Username validation
            if (signupStep === 1) {
                if (input.trim().length < 3 || input.trim().length > 15 || !/^[a-zA-Z_]+$/.test(input.trim())) {
                    return;
                }
                setSignupUserData({ username: input.trim().toLowerCase() });
                setSignupStep(2);
                setInput("");
            }


            // Email validation
            if (signupStep === 2) {
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim())) {
                    return;
                }
                setSignupUserData({ email: input.trim().toLowerCase() });
                setSignupStep(3);
                setInput("");
            }

            // Password validation
            if (signupStep === 3) {
                if (input.trim().length < 8) {
                    return;
                }
                setSignupUserData({ password: input.trim() });
                setSignupStep(4);
                setInput("");
            }

            // Confirm Password validation
            if (signupStep === 4) {
                if (input.trim().length < 8 || input.trim() !== signupUserData.password) {
                    return;
                }
                setSignupStep(5);
                setSignupUserData({ ConfirmPassword: input.trim() });
                setInput("");
            }

            // Accept the Terms validation
            if (signupStep === 5) {
                if (input.trim() === 'read') {
                    window.open('https://drive.google.com/file/d/1RWhzdw2ChOz18Sx5avUwOA2ulCcejkZl/', '_blank');
                } else if (input.trim() === 'agree') {
                    setSignupStep(6);
                    setSignupUserData({ acceptTerms: input.trim() });
                    setInput("");
                } else {
                    return;
                }
            }
        };

        // Handle Data Submit
        async function handleSubmit() {
            setIsLoading(true)
            try {
                await signup({
                    email: signupUserData.email || "",
                    password: signupUserData.password || "",
                    username: signupUserData.username || "",
                });

                // Move to Next stage Update the UI
                setSignupStep(7);
                setInput("");
                setIsLoading(false)
            } catch (error) {
                // Optionally show feedback to user
                console.error("Signup failed:", error);
                setIsLoading(false)
            }
        }

        if (signupStep === 6 && input.trim().toLowerCase() === "atm submit") {
            handleSubmit();
        }


        // Update Username
        if (signupStep === 6) {
            switch (input.trim()) {
                case 'atm update username':
                    setSignupStep(1);
                    setInput("");
                    break;
                case 'atm update email':
                    setSignupStep(2);
                    setInput("");
                    break;
                case 'atm update password':
                    setSignupStep(3);
                    setInput("");
                    break;
                case 'atm update confirm password':
                    setSignupStep(4);
                    setInput("");
                    break;
                case 'atm update accept terms':
                    setSignupStep(5);
                    setInput("");
                    break;
                default:
                    break;
            }
        }

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
                        signupStep === 0 ? "Type 'start' to begin your account signup process:~$" :
                            signupStep === 1 ? 'Enter a username:~$' :
                                signupStep === 2 ? 'Enter your email address:~$' :
                                    signupStep === 3 ? 'Create a password:~$' :
                                        signupStep === 4 ? 'Confirm your password:~$' :
                                            signupStep === 5 ? "Type 'read' to view the Terms of Use and Privacy Policy, or type 'agree' to accept and continue:~$" :
                                                signupStep === 6 ? "Update your info using the instructions above, or type 'atm submit' to finish creating your account:~$" :
                                                    signupStep === 7 ? "Type 'atm login' to activate your account:~$" :
                                                        null
                    }
                </div>
                <input
                    ref={inputRef}
                    type={
                        signupStep === 2 ? 'email' :
                            signupStep === 3 ? 'password' :
                                signupStep === 4 ? 'password' :
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