import { ArrowRight, CircleCheck } from "lucide-react";
import { useLogin, } from "../../../stores";

export default function LoginStepsInfo() {

    const { loginUserData } = useLogin();

    return (
        <div className="text-white mt-5 font-mono space-y-3 ml-10">
            <h2 className="text-blue-400 text-lg font-bold mb-2">
                Log In to Your Account
            </h2>

            <p className="mb-5">
                Please enter your credentials below to access your account. It's quick, secure, and easy!
            </p>


            <div className="max-w-[900px] space-y-4">

                {/* Step 1 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-blue-400 flex items-center">
                                What's your email? {loginUserData.email && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {loginUserData.email && loginUserData.email}
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            Enter the email you used to register your account.
                        </div>
                    </div>
                    {loginUserData.email && <CircleCheck className="text-green-500" size={30} />}
                </div>

                {/* Step 2 */}
                <div className="flex items-center justify-between rounded-xl border-green-400 bg-gray-900 w-full p-3">
                    <div>
                        <div className="flex space-x-2 ml-2 font-semibold">
                            <span className="text-blue-400 flex items-center">
                                Your password, please {loginUserData.password && <ArrowRight className="ml-2" size={14} />}
                            </span>
                            <span className="text-white">
                                {loginUserData.password &&
                                    [...Array(loginUserData.password.length)].map((_, i) => (
                                        <span key={i}>•</span>
                                    ))
                                }
                            </span>
                        </div>
                        <div className="ml-2 text-sm text-gray-400">
                            Enter your account password to log in securely.
                        </div>
                    </div>
                    {loginUserData.password && <CircleCheck className="text-green-500" size={30} />}
                </div>


                {/* Errors */}
                <p className="mb-5 text-red-400 hidden">
                    Errors shown here
                </p>
            </div>
        </div>
    );
}
