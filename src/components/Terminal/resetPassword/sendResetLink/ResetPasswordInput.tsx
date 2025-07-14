import { useEffect, useRef, useState } from "react";
import { useLoading, useResetPassword } from "../../../../stores";
import { resetPassword } from "../../../../apis";


export default function ResetPasswordInput() {

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoading, setIsLoading } = useLoading();
    const [input, setInput] = useState<string>("");

    const { resetPasswordStep, setResetPasswordData, setResetPasswordStep, resetPasswordData, setResetPasswordError } = useResetPassword();


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
            'atm whoami',
            'atm reset p'
        ]

        if (event.key === 'Escape') {
            window.location.href = "/";
            return;
        }

        if (event.ctrlKey && event.key.toLowerCase() === "c") {
            return;
        }



        if (event.key === 'Enter') {

            // Email validation
            if (resetPasswordStep === 0) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.trim())) {
                    return;
                }
                setResetPasswordData({ email: input.trim().toLowerCase() });
                setResetPasswordStep(1);
                setInput("");
            }

            // submit command validation
            if (resetPasswordStep === 1) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim() !== 'atm submit') {
                    return;

                } else if (input.trim() === 'atm submit') {
                    async function handleSubmit() {
                        setIsLoading(true);

                        const response = await resetPassword(resetPasswordData.email as string);

                        if (response.success) {
                            // Reset link sent successful
                            setResetPasswordError(null);
                            setResetPasswordStep(2);
                            setInput("");
                            setResetPasswordData({
                                email: null,
                            })
                        } else {
                            // Reset link sent failed
                            setInput("");
                            setResetPasswordStep(0);
                            setResetPasswordError("User with the requested email could not be found.");
                        }

                        setIsLoading(false);
                    }
                    handleSubmit()
                }
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
        setIsLoading(false)
    }, [])


    if (isLoading) return (
        <div className="flex space-x-1">
            <div className="text-green-400">Please wait</div>
            <span className="absolute ml-[110px] animate-spin text-green-400">█</span>
        </div>
    )

    return (
        <div className="flex justify-between space-x-1">
            <div className="m-0 p-0 flex">
                <div className="text-green-400">
                    {
                        resetPasswordStep === 0 ? 'Enter the email linked to your account:~$' :
                            resetPasswordStep === 1 ? "Type 'atm submit' to receive a reset link:~$" :
                                resetPasswordStep === 2 ? "Press Esc to return to the terminal:~$" :
                                    null
                    }
                </div>
                <input
                    ref={inputRef}
                    type={
                        resetPasswordStep === 0 ? 'email' :
                            resetPasswordStep === 1 ? 'text' :
                                'button'
                    }
                    value={input.toLowerCase()}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-green-200 font-mono pl-2 min-w-[400px]"
                    autoFocus
                />
            </div>
            <span className="animate-pulse duration-10 text-green-400">{input.length === 0 ? "█" : ""}</span>
        </div>
    );
}