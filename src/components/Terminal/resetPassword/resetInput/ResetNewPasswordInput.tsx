import { useEffect, useRef, useState } from "react";
import { useLoading, useResetNewPassword } from "../../../../stores";
import { completeResetPassword } from "../../../../apis";
import { useNavigate } from "react-router";


export default function ResetPasswordInput() {

    const inputRef = useRef<HTMLInputElement>(null);

    const { isLoading, setIsLoading } = useLoading();
    const [input, setInput] = useState<string>("");
    const navigate = useNavigate();
    // Store the UserId & the Secret key to be pushed to CompleteReset.tsx
    const [userId, setUserId] = useState<string | null>(null);
    const [secret, setSecret] = useState<string | null>(null);

    const { resetNewPasswordStep, setResetNewPasswordData, setResetNewPasswordStep, resetNewPasswordData, setResetNewPasswordError } = useResetNewPassword();

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

        if (event.altKey && event.key.toLowerCase() === "u") {
            setResetNewPasswordData({
                newPassword: null,
                confirmNewPassword: false
            });
            setInput("");
            setResetNewPasswordError(null);
            setResetNewPasswordStep(0);
            return;
        }

        if (event.key === 'Enter') {

            // New Password validation
            if (resetNewPasswordStep === 0) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim().length < 8) {
                    setResetNewPasswordError("Password too short — please enter at least 8 characters to ensure your account is secure.");
                    return;
                }
                setResetNewPasswordData({ newPassword: input.trim() });
                setResetNewPasswordError(null);
                setResetNewPasswordStep(1);
                setInput("");
            }

            // Confirm New Password validation
            if (resetNewPasswordStep === 1) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (resetNewPasswordData.newPassword !== input.trim()) {
                    setResetNewPasswordError("Passwords do not match. Please make sure both fields are identical.");
                    setResetNewPasswordData({ confirmNewPassword: false });
                    return;
                }

                setResetNewPasswordData({ confirmNewPassword: true });
                setResetNewPasswordError(null);
                setResetNewPasswordStep(2);
                setInput("");
            }

            // submit command validation
            if (resetNewPasswordStep === 2) {

                // Prevent banned commands 
                if (bannedCommands.includes(input.trim()) || input.trim() === '') {
                    return;
                }

                if (input.trim() !== 'atm submit') {
                    return;

                } else if (input.trim() === 'atm submit') {
                    
                    async function handleSubmit() {
                        setIsLoading(true);

                        const response = await completeResetPassword({ userId: userId as string, secret: secret as string, newPassword: resetNewPasswordData.newPassword as string });

                        if (response) {
                            setResetNewPasswordStep(3) // To display the Successful Password Reset Process Msg
                            setResetNewPasswordData({
                                newPassword: null,
                                confirmNewPassword: false
                            });
                            setInput("");
                            setResetNewPasswordError(null);
                            setIsLoading(false);
                        } else {
                            setResetNewPasswordStep(4) // To display the Error Msg during password reset
                            setResetNewPasswordError("The password reset link may have expired or is invalid. Please request a new one and make sure you're copying the entire link from your email without any extra spaces.");
                            setInput("");
                            setIsLoading(false);
                        }

                        setIsLoading(false);
                    }
                    handleSubmit()
                }
            }

            // 'atm reset p' command validation
            if (resetNewPasswordStep === 4) {

                if (input.trim() !== 'atm reset p') {
                    return;

                } else if (input.trim() === 'atm reset p') {
                    console.log('go to reset')
                    navigate('/reset');
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
        setIsLoading(true)
        setResetNewPasswordData({
            newPassword: null,
            confirmNewPassword: false
        });
        setInput("");
        setResetNewPasswordError(null);
        setResetNewPasswordStep(0);

        const params = new URLSearchParams(window.location.search);
        const userIdParam = params.get('userId');
        const secretParam = params.get('secret');

        if (userIdParam && secretParam) {
            setUserId(userIdParam);
            setSecret(secretParam);
            setIsLoading(false)
        } else {
            window.location.href = "/";
        }

    }, []);


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
                        resetNewPasswordStep === 0 ? 'Create a strong new password' :
                            resetNewPasswordStep === 1 ? "Re-enter the new password to confirm" :
                                resetNewPasswordStep === 2 ? "Type 'atm submit' to complete resetting your password" :
                                    resetNewPasswordStep === 3 ? "Press Esc to return to the terminal" :
                                        resetNewPasswordStep === 4 ? "Type 'atm reset p' to receive a new password reset link" :
                                            null
                    }:~$
                </div>
                <input
                    ref={inputRef}
                    type={
                        resetNewPasswordStep === 0 || resetNewPasswordStep === 1 ? 'password' :
                            resetNewPasswordStep === 2 || resetNewPasswordStep === 4 ? 'text' : 'button'
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