import { useState, forwardRef, useEffect } from "react";
import { useHistory, useLoading, useLogin, useSignup, useUser, useUserData } from "../../stores";
import { guests_help, users_help, whoami } from "../../commands";
import { useNavigate } from "react-router";
import { logout } from "../../apis/backend/auth/logout";


const Input = forwardRef<HTMLInputElement>((_, ref) => {

  const { userData } = useUserData();
  const { isLoggedin } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const { setSignupStep } = useSignup();
  const { setLoginStep } = useLogin();
  const [input, setInput] = useState<string>("");
  const { addEntry, setHistory } = useHistory();

  const navigate = useNavigate();

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
            email: userData?.email || '',
            RPU: userData?.prefs?.RPU || 0,
            MRPU: userData?.prefs?.MRPU || 0,
          },
          prompt: {
            text: input,
          },
          response:
            [{
              id: metaData().responseId,
              timestamp: metaData().time,
              content: userData !== null ? users_help() : guests_help(),
            }
            ]
        }
      );

      setInput(""); // Clear the input after adding the entry
    }

    if (input.trim() === 'atm whoami') {
      if (userData == null) return;

      addEntry(
        {
          id: metaData().promptId,
          timestamp: metaData().time,
          date: metaData().date,
          user: {
            email: userData.email,
            RPU: userData.prefs?.RPU,
            MRPU: userData.prefs?.MRPU,
          },
          prompt: {
            text: input,
          },
          response:
            [{
              id: metaData().responseId,
              timestamp: metaData().time,
              content: whoami(userData.name, userData.email),
            }
            ]
        }
      );

      setInput(""); // Clear the input after adding the entry
    }

    if (input.trim() === 'atm signup') {
      if (userData !== null) return;

      setSignupStep(0);
      setInput(""); // Clear the input after
    }

    if (input.trim() === 'atm login') {
      if (userData !== null) return;

      setLoginStep(0);
      setInput(""); // Clear the input after
    }

    if (input.trim() === 'atm reset p') {
      if (userData !== null) return;

      navigate('/reset')
    }

    if (input.trim() === 'atm logout') {
      if (userData !== null) {
        setIsLoading(true)
        async function handleLogout() {
          setIsLoading(true)
          const res = await logout();
          if (res) {
            window.location.reload()
          } else {
            console.error('Can not logout! something went wrong while logging out!');
            setIsLoading(false)
          }
        }
        handleLogout()
        setInput(""); // Clear the input after
      } else {
        setIsLoading(false)
        return
      }
    }

  }

  useEffect(() => {
    if (userData === null) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000);
    }
  }, [])

  useEffect(() => {
    console.log(userData)
  }, [userData])


  if (isLoggedin === undefined || isLoading) return (
    <div className="flex space-x-1">
      <div className="text-green-400">Please wait</div>
      <span className="absolute ml-[110px] animate-spin text-green-400">█</span>
    </div>
  )

  return (
    <div className="flex space-x-1">
      <div className="text-green-400">
        {`${userData?.name || 'guest'}@automission.ai:~$`}
      </div>
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