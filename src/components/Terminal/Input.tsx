import { useState, forwardRef } from "react";
import { useHistory, useLoading, useUser } from "../../stores";
import { help } from "../../commands";


const Input = forwardRef<HTMLInputElement>((_, ref) => {

  const { isLoggedin } = useUser();
  const { isLoading } = useLoading();

  const [input, setInput] = useState<string>("");
  const { addEntry, setHistory } = useHistory();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

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
      const time = new Date().toLocaleTimeString();
      const date = new Date().toDateString();
      const newPromptId = Math.floor(Math.random() * 1000000);
      const newResponseId = Math.floor(Math.random() * 1000000);

      addEntry(
        {
          id: newPromptId,
          timestamp: time,
          date: date,
          user: {
            email: 'useremail@gmail.com',
            RPU: 1,
            MRPU: 100,
          },
          prompt: {
            text: input,
          },
          response:
            [{
              id: newResponseId,
              timestamp: time,
              content: help(),
            }
            ]
        }
      );

      setInput(""); // Clear the input after adding the entry
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
      <span className="absolute ml-[197px] animate-pulse duration-10 text-green-400">{input.length === 0 ? "█" : ""}</span>
    </div>
  );
});

export default Input;