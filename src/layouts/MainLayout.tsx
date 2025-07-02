import { useEffect, useRef } from "react";
import { Footer, Header, Input } from "../components";
import { useHistory, useUser } from "../stores";


export default function MainLayout() {

  const { isLoggedin } = useUser();


  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { history } = useHistory();

  // Scroll to bottom whenever `history` changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <div
      ref={terminalRef}
      className="flex flex-col justify-between space-y-1 bg-black text-white h-screen w-screen p-3 font-mono"
      onClick={() => inputRef.current?.focus()}>
      <div className="flex flex-col w-full overflow-auto flex-grow">

        {/* Display history entries */}
        <div className="mt-1 space-y-2 hide-scrollbar mb-8">

          {/* Welcome header context */}
          <Header />

          {history.map((record, index) => (
            <div key={index}>
              <div key={record.id || index} className="border-b border-gray-700 pb-2">
                <p className="text-green-400">
                  <span className="font-bold">({record.timestamp}):</span> <span className="text-green-200">{record.prompt.text}</span>
                </p>
                {record.response.map((res) => (
                  <div key={index++} className="text-blue-200">
                    <div>
                      <span className="font-bold">➜({res.timestamp}):</span>
                      <pre className="-mt-5 ml-2">
                        {res.content}
                      </pre>
                    </div>
                  </div>
                ))}
              </div>

              {isLoggedin && (
                <>
                  <div ref={bottomRef} />

                  {/* Display the user basic infos */}
                  {record.user && (
                    <p key={index++} className="text-orange-200 mt-2">{record.date} • {record.user.email} • Number of requests used: ({record.user.RPU}/{record.user.MRPU})</p>
                  )}
                </>
              )}

            </div>
          ))}

        </div>

      </div>

      {/* Prompts input */}
      <Input ref={inputRef} />

      <Footer />
    </div>
  );
}
