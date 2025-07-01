import { useRef, type ReactNode } from "react"
import { Footer, Header, Input } from "../components";

type Props = {
  outputs: ReactNode;
}

export default function MainLayout({ outputs }: Props) {

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);



  return (
    <div
      ref={terminalRef}
      className="flex flex-col justify-between space-y-1 bg-black text-white h-screen w-screen p-4"
      onClick={() => inputRef.current?.focus()}>
      <div className="flex flex-col w-full">
        <Header />
        {outputs}
        <Input ref={inputRef} />
      </div>
      <Footer />
    </div>
  )
}