import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useResetPassword } from "../../../../stores";
import useHeader from "../../../../stores/header/useHeader";

export default function ResetPasswordStepsInfo() {

    const { setDisplayHelpContext } = useHeader();
    const { setResetPasswordStep, resetPasswordData, resetPasswordError } = useResetPassword();


    useEffect(() => {
        setDisplayHelpContext(false)
        setResetPasswordStep(0)
    }, []);

    return (
        <div className="text-white mt-5 font-mono space-y-3 ml-10">
            <h2 className="text-green-400 text-lg font-bold mb-2">
                Reset Your Password
            </h2>

            <p className="mb-5 max-w-[850px]">
                Forgot your password? No worries — it happens! Enter your email below, and we’ll send you instructions to reset it.
            </p>

            <div className="max-w-[900px] space-y-4">

                {/* Step 1 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-green-400 flex items-center">
                                What's your email? {resetPasswordData.email && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {resetPasswordData.email && resetPasswordData.email}
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            Enter the email address linked to your account so we can help you securely reset your password.
                        </div>
                    </div>
                </div>

                {/* Errors */}
                {resetPasswordError !== null && (<p className="mb-5 text-red-400">{resetPasswordError}</p>)}
            </div>
        </div>
    );
}
