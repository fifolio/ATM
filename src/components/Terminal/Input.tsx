import { useState, forwardRef } from "react";

const Input = forwardRef<HTMLInputElement>((_, ref) => {

  const [input, setInput] = useState<string>("");

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      console.log(input);
    }

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      console.log("clean");
    }
  }

  return (
    <div className="flex space-x-1">
      <div className="text-green-400">guest@automission:~$</div>
      <input
        ref={ref}
        type="text"
        value={input.toLowerCase()}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none text-green-400 font-mono w-full"
        autoFocus
      />
      <span className="absolute ml-[172px] animate-pulse duration-10 text-green-400">{input.length === 0 ? "█" : ""}</span>
    </div>
  );
});

export default Input;