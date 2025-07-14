import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useResetNewPassword } from "../../../../stores";
import useHeader from "../../../../stores/header/useHeader";
import { useNavigate } from "react-router";


export default function ResetPasswordStepsInfo() {

    const { setDisplayHelpContext } = useHeader();
    const navigate = useNavigate();
    const {
        setResetNewPasswordStep,
        resetNewPasswordData,
        setResetNewPasswordData,
        resetNewPasswordError,
        resetNewPasswordScreenLoadingState,
        setResetNewPasswordScreenLoadingState } = useResetNewPassword();


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const userIdParam = params.get('userId');
        const secretParam = params.get('secret');

        if (userIdParam && secretParam) {
            setResetNewPasswordData({
                newPassword: null,
                confirmNewPassword: null,
                userId: userIdParam,
                secret: secretParam
            });
            setResetNewPasswordStep(0)
            setResetNewPasswordScreenLoadingState(false)

        } else {
            navigate("/");
        }

    }, []);

    useEffect(() => {
        setDisplayHelpContext(false)
    }, [resetNewPasswordData.userId])

    return (
        <div className={`${resetNewPasswordScreenLoadingState ? 'hidden' : ''} text-white mt-5 font-mono space-y-3 ml-10`}>
            <h2 className="text-green-400 text-lg font-bold mb-2">
                Set Your New Password
            </h2>

            <p className="mb-5 max-w-[850px]">
                You're almost there! Please enter your new password below to complete the reset process and regain access to your account.
            </p>

            <div className="max-w-[900px] space-y-4">

                {/* Step 1 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-green-400 flex items-center">
                                Set Your New Password {resetNewPasswordData.newPassword && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            {resetNewPasswordData.newPassword &&
                                [...Array(resetNewPasswordData.newPassword.length)].map((_, i) => (
                                    <span key={i}>•</span>
                                ))
                            }
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            Password must be at least 8 characters and include letters, numbers, and symbols.
                        </div>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-green-400 flex items-center">
                                Confirm New Password {resetNewPasswordData.confirmNewPassword && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            {resetNewPasswordData.confirmNewPassword &&
                                [...Array(resetNewPasswordData.newPassword?.length)].map((_, i) => (
                                    <span key={i}>•</span>
                                ))
                            }
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            This helps ensure there were no typos in your password entry.
                        </div>
                    </div>
                </div>

                {/* Errors */}
                {resetNewPasswordError !== null && (<p className="mb-5 text-red-400">{resetNewPasswordError}</p>)}

                <p className="mb-5 text-gray-400">
                    Press <span className="text-white">Alt+U</span> to update your password. Note: This will clear any passwords you've already entered.
                </p>
            </div>
        </div>
    );
}
