import { useEffect, useRef, useState } from "react";
import { useLoading, useLogin, useUser } from "../../../stores";
import { login } from "../../../apis/backend/auth/login";


export default function LoginInput() {

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoggedin } = useUser();
    const { isLoading, setIsLoading } = useLoading();
    const { loginStep, setLoginStep, loginUserData, setLoginUserData, setLoginError } = useLogin();

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
            setLoginStep(null);
            setLoginUserData({
                email: null,
                password: null,
            })
            setInput('');
            setLoginError(null)
            return;
        }

        if (event.ctrlKey && event.key.toLowerCase() === "c") {
            return;
        }


        if (event.key === 'Enter') {

            // Email validation
            if (loginStep === 0) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim())) {
                    return;
                }
                setLoginUserData({ email: input.trim().toLowerCase() });
                setLoginStep(1);
                setInput("");
            }

            // Password validation
            if (loginStep === 1) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim().length < 8) {
                    return;
                }
                setLoginUserData({ password: input.trim() });
                setLoginStep(2);
                setInput("");
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


    useEffect(() => {

        if (loginStep === 2) {
            setIsLoading(true);

            async function handleSubmit() {
                const response = await login({
                    email: loginUserData.email || "",
                    password: loginUserData.password || "",
                });

                setLoginUserData({
                    email: null,
                    password: null,
                });

                if (response.success) {
                    // Login successful
                    setLoginStep(null);
                    setLoginError(null);
                    setLoginStep(0);
                } else {
                    // Login failed
                    setLoginError((response.error as Error).message);
                    setLoginStep(0);
                }

                setIsLoading(false);
            }

            handleSubmit();
        }

    }, [loginStep])



    if (isLoggedin === undefined || isLoading) return (
        <div className="flex space-x-1">
            <div className="text-blue-400">Please wait</div>
            <span className="absolute ml-[110px] animate-spin text-blue-400">█</span>
        </div>
    )

    return (
        <div className="flex justify-between space-x-1">
            <div className="m-0 p-0 flex">
                <div className="text-blue-400">
                    {
                        loginStep === 0 ? "Enter your email address:~$" :
                            loginStep === 1 ? 'Type your password, then hit Enter to log in:~$' :
                                null
                    }
                </div>
                <input
                    ref={inputRef}
                    type={
                        loginStep === 0 ? 'email' :
                            loginStep === 1 ? 'password' :
                                'text'
                    }
                    value={input.toLowerCase()}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-blue-200 font-mono pl-2 min-w-[400px]"
                    autoFocus
                />
            </div>
            <span className="animate-pulse duration-10 text-blue-400">{input.length === 0 ? "█" : ""}</span>
        </div>
    );
}