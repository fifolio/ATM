import { useState, forwardRef } from "react";
import { useHistory, useLoading, useSignup, useUser } from "../../stores";
import { help, signupSteps } from "../../commands";


const Input = forwardRef<HTMLInputElement>((_, ref) => {

  const { isLoggedin } = useUser();
  const { isLoading } = useLoading();
  const { setSignupStep } = useSignup();

  const [input, setInput] = useState<string>("");
  const { addEntry, setHistory } = useHistory();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

    function metaData() {
      const time = new Date().toLocaleTimeString();
      const date = new Date().toDateString();
      const promptId = Math.floor(Math.random() * 1000000);
      const responseId = Math.floor(Math.random() * 1000000);
      return { time, date, promptId, responseId }
    }

    if (input.trim() === "atm clear") {
      setHistory([]);
      setInput("");
      return;
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      return;
    }

    if (input.trim() === '') return;

    if (input.trim() === 'atm help') {
      addEntry(
        {
          id: metaData().promptId,
          timestamp: metaData().time,
          date: metaData().date,
          user: {
            email: '',
            RPU: 0,
            MRPU: 0,
          },
          prompt: {
            text: input,
          },
          response:
            [{
              id: metaData().responseId,
              timestamp: metaData().time,
              content: help(),
            }
            ]
        }
      );

      setInput(""); // Clear the input after adding the entry
    }

    if (input.trim() === 'atm signup') {
      setSignupStep(0);
      addEntry(
        {
          id: metaData().promptId,
          timestamp: metaData().time,
          date: metaData().date,
          user: {
            email: '',
            RPU: 0,
            MRPU: 0,
          },
          prompt: {
            text: input,
          },
          response:
            [{
              id: metaData().responseId,
              timestamp: metaData().time,
              content: signupSteps()[0].welcome as string,
            }
            ]
        }
      );
      setInput(""); // Clear the input after
    }

  }

  if (isLoggedin === undefined || isLoading) return (
    <div className="flex space-x-1">
      <div className="text-green-400">Please wait</div>
      <span className="absolute ml-[110px] animate-spin text-green-400">█</span>
    </div>
  )

  return (
    <div className="flex space-x-1">
      <div className="text-green-400">guest@automission.ai:~$</div>
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none text-green-200 font-mono w-full"
        autoFocus
      />
      <span className="animate-pulse duration-10 text-green-400">{input.length === 0 ? "█" : ""}</span>
    </div>
  );
});

export default Input;