import { ArrowRight, CircleCheck } from "lucide-react";
import { useSignup } from "../../../stores";

export default function SignupStepsInfo() {

    const { signupUserData, signupStep, signupError } = useSignup();

    return (
        <div className="text-white mt-5 font-mono space-y-3 ml-10">
            <h2 className="text-orange-400 text-lg font-bold mb-2">
                Signup New Account Process
            </h2>

            <p className="mb-5">
                You're about to create your account. Just follow the instructions below — it's quick and easy!
            </p>

            {/* Step 1 */}
            <div className="max-w-[900px] space-y-4">


                {/* Step 1 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-orange-400 flex items-center">
                                Choose a Username {signupUserData.username && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {signupUserData.username && signupUserData.username}
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            Username must be between 3 and 15 characters and can include letters, and underscores.
                        </div>
                    </div>
                    {signupUserData.username && <CircleCheck className="text-green-500" size={30} />}
                </div>

                {/* Step 2 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-orange-400 flex items-center">
                                Enter your Email {signupUserData.email && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {signupUserData.email && signupUserData.email}
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            We'll use this for email confirmation, login, recovery, and important notifications.
                        </div>
                    </div>
                    {signupUserData.email && <CircleCheck className="text-green-500" size={30} />}
                </div>

                {/* Step 3 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-orange-400 flex items-center">
                                Create a Password {signupUserData.password && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {signupUserData.password &&
                                    [...Array(signupUserData.password.length)].map((_, i) => (
                                        <span key={i}>•</span>
                                    ))
                                }
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            Password must be at least 8 characters and include letters, numbers, and symbols.
                        </div>
                    </div>
                    {signupUserData.password && <CircleCheck className="text-green-500" size={30} />}
                </div>

                {/* Step 4 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-orange-400 flex items-center">
                                Confirm your Password {signupUserData.ConfirmPassword && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {signupUserData.ConfirmPassword &&
                                    [...Array(signupUserData.ConfirmPassword.length)].map((_, i) => (
                                        <span key={i}>•</span>
                                    ))
                                }
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            This helps ensure there were no typos in your password entry.
                        </div>
                    </div>
                    {signupUserData.ConfirmPassword && <CircleCheck className="text-green-500" size={30} />}
                </div>

                {/* Step 5 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-orange-400 flex items-center">
                                Accept Automission Agreement Policies {signupUserData.acceptTerms === 'agree' && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {signupUserData.acceptTerms === 'agree' && <span>✓ Agreed</span>}
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            You must accept and agree on our Terms and Policies to continue.
                        </div>
                    </div>
                    {signupUserData.acceptTerms === 'agree' && <CircleCheck className="text-green-500" size={30} />}
                </div>

                {/* Errors */}
                {signupError !== null && (<p className="mb-5 text-red-400">An account with this email already exists. Please use a different email to sign up</p>)}</div>

            {signupStep === 5 && (
                <p className="mb-5 text-gray-400">
                    To update your info, type <span className="text-white">'atm update'</span> followed by the field name. i.e., <span className="text-white">'atm update username'</span> or <span className="text-white">'atm update password'</span>.
                </p>
            )}

        </div>
    );
}
