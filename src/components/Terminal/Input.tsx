import { useState, forwardRef } from "react";
import { useHistory } from "../../stores";
import { help } from "../../commands";


const Input = forwardRef<HTMLInputElement>((_, ref) => {

  const [input, setInput] = useState<string>("");
  const { addEntry, setHistory } = useHistory();

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {

    if (event.ctrlKey && event.key.toLowerCase() === "c" || input.trim() === "atm clear") {
      setHistory([]);
      setInput("");
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

  return (
    <div className="flex space-x-1">
      <div className="text-green-400">guest@automission.ai:~$</div>
      <input
        ref={ref}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none text-green-400 font-mono w-full"
        autoFocus
      />
      <span className="absolute ml-[197px] animate-pulse duration-10 text-green-400">{input.length === 0 ? "█" : ""}</span>
    </div>
  );
});

export default Input;