import { useEffect, useRef } from "react";
import { AccountReadyMsg, Footer, Header, Input, SignupInput, SignupStepsInfo } from "../components";
import { useHistory, useSignup, useUser } from "../stores";
import SignupFooter from "../components/Terminal/signup/SignupFooter";


export default function MainLayout() {

  const { isLoggedin } = useUser();
  const { signupStep } = useSignup();

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { history } = useHistory();

  // Scroll to bottom whenever `history` changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, signupStep]);

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
            signupStep !== null && signupStep > 0 && signupStep <= 6 ? (
              <SignupStepsInfo />
            ) : signupStep === 7 ? (
              <AccountReadyMsg />
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

                  {isLoggedin && (
                    <>
                      {/* Display the user basic infos */}
                      {record.user && (
                        <p key={recordIndex++} className="text-orange-200 mt-2">{record.date} • {record.user.email} • Number of requests used: ({record.user.RPU}/{record.user.MRPU})</p>
                      )}
                    </>
                  )}

                </div>
              ))
            )}

          <div ref={bottomRef} />
        </div>

      </div>


      {
        signupStep === null ? (
          // Prompts input + Footer
          <>
            <Input ref={inputRef} />
            <Footer />
          </>
        ) : (
          //  Signup input
          <>
            <SignupInput />
            <SignupFooter />
          </>
        )
      }

    </div >
  );
}
