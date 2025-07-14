import { useEffect, useRef } from "react";
import { AccountReadyMsg, Footer, Header, Input, LoginFooter, LoginInput, LoginStepsInfo, ResetPasswordFooter, ResetPasswordInput, ResetPasswordStepsInfo, SignupInput, SignupStepsInfo, ResetPasswordLinkSentMsg, ResetNewPasswordScreen, ResetNewPasswordSuccessMsg, ResetNewPasswordInput } from "../components";
import { useHistory, useLogin, useResetNewPassword, useResetPassword, useSignup } from "../stores";
import SignupFooter from "../components/Terminal/signup/SignupFooter";
import useHeader from "../stores/header/useHeader";

type Props = {
  route?: string;
}

export default function MainLayout({ route }: Props) {

  const { signupStep } = useSignup();
  const { loginStep } = useLogin();
  const { setDisplayHelpContext } = useHeader();
  const { resetPasswordStep } = useResetPassword()
  const { resetNewPasswordStep } = useResetNewPassword()


  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { history } = useHistory();

  // Scroll to bottom whenever `history` changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, signupStep]);

  useEffect(() => {
    setDisplayHelpContext(true)
  }, [])

  // Check if there's an active session
  useEffect(() => {
    if (window.location.href.includes("reset")) {
      setDisplayHelpContext(false)
    }
  }, []);


  return (
    <div
      ref={terminalRef}
      className="flex flex-col justify-between space-y-1 bg-black text-white h-screen w-screen px-1 font-mono"
      onClick={() => inputRef.current?.focus()}>
      <div className="flex flex-col w-full overflow-auto flex-grow">

        {/* Display history entries */}
        <div className="mt-1 space-y-2 hide-scrollbar mb-8">

          {/* Welcome header context */}
          <Header />

          {
            loginStep !== null ? (
              <LoginStepsInfo />
            ) : signupStep !== null && signupStep >= 0 && signupStep <= 5 ? (
              <SignupStepsInfo />
            ) : signupStep === 6 ? (
              <AccountReadyMsg />
            ) : route === 'resetPassword_resetInput' && resetNewPasswordStep !== null && resetNewPasswordStep !== 3 ? (
              <ResetNewPasswordScreen />
            ) : resetNewPasswordStep === 3 ? (
              <ResetNewPasswordSuccessMsg />
            ) : route === 'resetPassword_sendResetLink' && resetPasswordStep !== null && resetPasswordStep >= 0 && resetPasswordStep < 2 ? (
              <ResetPasswordStepsInfo />
            ) : resetPasswordStep === 2 ? (
              <ResetPasswordLinkSentMsg />
            ) : (
              history.map((record, recordIndex) => (
                <div key={record.id ?? recordIndex} className="border-b border-gray-700 pb-2">
                  <p className="text-green-400">
                    <span className="font-bold">({record.timestamp}):</span>{" "}
                    <span className="text-green-200">{record.prompt.text}</span>
                  </p>
                  {record.response.map((res, resIndex) => (
                    <div key={resIndex} className="text-white ml-4">
                      <div>
                        <span className="font-bold">➜({res.timestamp}):</span>
                        <pre className="-mt-5 ml-2 whitespace-pre-wrap">{res.content}</pre>
                      </div>
                    </div>
                  ))}
                  <>
                    {/* Display the user basic infos */}
                    {record.user.email === '' ? null : (
                      <p key={recordIndex++} className="text-orange-200 mt-2">
                        {record.date} • {record.user.email} • Number of requests used: ({record.user.RPU}/{record.user.MRPU})
                      </p>
                    )}
                  </>
                </div>
              ))
            )
          }


          <div ref={bottomRef} />
        </div>
      </div>


      {signupStep !== null ? (
        <>
          <SignupInput />
          <SignupFooter />
        </>
      ) : loginStep !== null ? (
        <>
          <LoginInput />
          <LoginFooter />
        </>
      ) : route == 'resetPassword_resetInput' ? (
        <>
          <ResetNewPasswordInput />
          <ResetPasswordFooter />
        </>
      ) : route == 'resetPassword_sendResetLink' ? (
        <>
          <ResetPasswordInput />
          <ResetPasswordFooter />
        </>
      ) :
        (
          <>
            <Input ref={inputRef} />
            <Footer />
          </>
        )}

    </div >
  );
}
