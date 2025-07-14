import { CheckCircle } from "lucide-react";

export default function ResetNewPasswordSuccessMsg() {
  return (
    <div className="font-mono border p-4 rounded-xl text-green-400 max-w-lg ml-10 mt-11">
      <div className="flex items-center space-x-3 mb-2">
        <CheckCircle size={40} className="text-green-500" />
        <h1 className="text-2xl font-bold">All Set!</h1>
      </div>

      <p className="text-sm text-green-300">
        Your password has been successfully reset.{" "}
        Return to the ATM terminal by pressing <code className="bg-gray-800 px-1 rounded">Esc</code>.
      </p>
    </div>
  );
}
