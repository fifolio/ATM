import { useState, forwardRef, useEffect } from "react";
import { useHistory, useLoading, useLogin, useSignup, useUser, useUserData } from "../../stores";
import {
  command_response_guests_help,
  command_response_users_help,
  command_response_details,
  command_response_whoami,
  command_response_limitWarning,
  command_response_atm_predict_insights,
  command_response_atm_predict_bulls,
  command_response_atm_predict_bears,
  command_response_atm_best_long,
  command_response_atm_best_short,
  command_response_atm_forecast_coin
} from "../../commands";
import { useNavigate } from "react-router";
import { logout } from "../../apis/backend/auth/logout";
import {
  PRUxMRPU_handler,
  runBestLong,
  runBestShort,
  runForecastCoin,
  runMarketBears,
  runMarketBulls,
  runMarketInsights
} from "../../x";


const Input = forwardRef<HTMLInputElement>((_, ref) => {

  const { userData } = useUserData();
  const { isLoggedin } = useUser();
  const { isLoading, setIsLoading } = useLoading();
  const { setSignupStep } = useSignup();
  const { setLoginStep } = useLogin();
  const [input, setInput] = useState<string>("");
  const { addEntry, setHistory } = useHistory();

  const navigate = useNavigate();

  // Helper function to get metadata with a fresh timestamp
  const getMetaData = () => {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
    const date = now.toDateString();
    const promptId = Math.floor(Math.random() * 1000000);
    const responseId = Math.floor(Math.random() * 1000000);
    return { time, date, promptId, responseId };
  }

  async function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter") return;

    if (input.trim() === '') return;

    if (event.ctrlKey && event.key.toLowerCase() === "c") {
      return;
    }

    if (input.trim() === "clear" || input.trim() === "atm clear") {
      setHistory([]);
      setInput("");
      return;
    }

    // Capture metadata for the prompt right when the user hits Enter
    const promptMetaData = getMetaData();

    if (input.trim() === 'atm help') {
      const responseMetaData = getMetaData(); // Get new timestamp for response
      addEntry(
        {
          id: promptMetaData.promptId,
          timestamp: promptMetaData.time,
          date: promptMetaData.date,
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
              id: responseMetaData.responseId,
              timestamp: responseMetaData.time,
              content: userData !== null ? command_response_users_help() : command_response_guests_help(),
            }
            ]
        }
      );
      setInput(""); // Clear the input after adding the entry
      return;
    }

    if (input.trim() === 'atm whoami') {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      addEntry(
        {
          id: promptMetaData.promptId,
          timestamp: promptMetaData.time,
          date: promptMetaData.date,
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
              id: responseMetaData.responseId,
              timestamp: responseMetaData.time,
              content: command_response_whoami(userData.name, userData.email),
            }
            ]
        }
      );
      setInput(""); // Clear the input after adding the entry
      return;
    }

    if (input.trim() === 'atm details') {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      addEntry(
        {
          id: promptMetaData.promptId,
          timestamp: promptMetaData.time,
          date: promptMetaData.date,
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
              id: responseMetaData.responseId,
              timestamp: responseMetaData.time,
              content: command_response_details(
                userData.name,
                userData.email,
                userData.emailVerification,
                new Date(userData.registration).toLocaleString('en-US', {
                  timeZone: 'UTC',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                }),
                new Date(userData.passwordUpdate).toLocaleString('en-US', {
                  timeZone: 'UTC',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                }),
                userData.prefs.RPU,
                userData.prefs.MRPU,
                userData.prefs.resetDate),
            }
            ]
        }
      );

      setInput(""); // Clear the input after adding the entry
      return;
    }

    if (input.trim() === 'atm signup') {
      if (userData !== null) return;

      setSignupStep(0);
      setInput(""); // Clear the input after
      return;
    }

    if (input.trim() === 'atm login') {
      if (userData !== null) return;

      setLoginStep(0);
      setInput(""); // Clear the input after
      return;
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
        return;
      } else {
        setIsLoading(false)
        return
      }
    }

    if (input.trim() === 'atm predict insights') {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      setIsLoading(true);
      PRUxMRPU_handler(5)
        .then(async (res) => {
          if (res === 'limitWarning') {
            addEntry(
              {
                id: promptMetaData.promptId,
                timestamp: promptMetaData.time,
                date: promptMetaData.date,
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
                    id: responseMetaData.responseId,
                    timestamp: responseMetaData.time,
                    content: await command_response_limitWarning(),
                  }
                  ]
              }
            );
            setInput(""); // Clear the input after adding the entry
            setIsLoading(false);
            return;
          } else if (res === true) {
            runMarketInsights().then(async (res) => {
              const responseMetaData = getMetaData(); // Get new timestamp for response
              addEntry(
                {
                  id: promptMetaData.promptId,
                  timestamp: promptMetaData.time,
                  date: promptMetaData.date,
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
                      id: responseMetaData.responseId,
                      timestamp: responseMetaData.time,
                      content: command_response_atm_predict_insights({
                        date: res.date,
                        market_cap_usd: res.market_cap_usd,
                        volume_usd: res.volume_usd,
                        btc_dominance: res.btc_dominance,
                        sentiment_score: res.sentiment_score,
                        sentiment_classification: res.sentiment_classification,
                        bitcoin_price_USD: res.bitcoin_price_USD,
                        previous_bitcoin_price_USD: res.previous_bitcoin_price_USD,
                        active_cryptocurrencies: res.active_cryptocurrencies,
                        active_markets: res.active_markets,
                        trend_overall_market_trend: res.trend_overall_market_trend,
                        trend_dominance_influence: res.trend_dominance_influence,
                        market_direction_current_direction: res.market_direction_current_direction,
                        market_direction_justification: res.market_direction_justification,
                        signal_strength_strength_evaluation: res.signal_strength_strength_evaluation,
                        signal_strength_classification: res.sentiment_classification
                      }),
                    }
                    ]
                }
              );
            }, (err) => {
              console.error(err);
            }).finally(() => {
              setInput(""); // Clear the input after adding the entry
              setIsLoading(false);
              return;
            });
          }
        })

    }

    if (input.trim() === 'atm predict bulls') {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      setIsLoading(true);
      PRUxMRPU_handler(5)
        .then(async (res) => {
          if (res === 'limitWarning') {
            addEntry(
              {
                id: promptMetaData.promptId,
                timestamp: promptMetaData.time,
                date: promptMetaData.date,
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
                    id: responseMetaData.responseId,
                    timestamp: responseMetaData.time,
                    content: await command_response_limitWarning(),
                  }]
              }
            );
            setInput(""); // Clear the input after adding the entry
            setIsLoading(false);
            return;
          } else if (res === true) {
            runMarketBulls().then((res) => {
              const responseMetaData = getMetaData(); // Get new timestamp for response
              addEntry(
                {
                  id: promptMetaData.promptId,
                  timestamp: promptMetaData.time,
                  date: promptMetaData.date,
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
                      id: responseMetaData.responseId,
                      timestamp: responseMetaData.time,
                      content: command_response_atm_predict_bulls(res),
                    }]
                }
              );
            }, (err) => {
              console.error(err);
            }).finally(() => {
              setInput(""); // Clear the input after adding the entry
              setIsLoading(false);
              return;
            });
          }
        });
    }

    if (input.trim() === 'atm predict bears') {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      setIsLoading(true);
      PRUxMRPU_handler(5)
        .then(async (res) => {
          if (res === 'limitWarning') {
            addEntry(
              {
                id: promptMetaData.promptId,
                timestamp: promptMetaData.time,
                date: promptMetaData.date,
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
                    id: responseMetaData.responseId,
                    timestamp: responseMetaData.time,
                    content: await command_response_limitWarning(),
                  }]
              }
            );
            setInput(""); // Clear the input after adding the entry
            setIsLoading(false);
            return;
          } else if (res === true) {
            runMarketBears().then((res) => {
              const responseMetaData = getMetaData(); // Get new timestamp for response
              addEntry(
                {
                  id: promptMetaData.promptId,
                  timestamp: promptMetaData.time,
                  date: promptMetaData.date,
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
                      id: responseMetaData.responseId,
                      timestamp: responseMetaData.time,
                      content: command_response_atm_predict_bears(res),
                    }]
                }
              );
            }, (err) => {
              console.error(err);
            }).finally(() => {
              setInput(""); // Clear the input after adding the entry
              setIsLoading(false);
              return;
            });
          }
        });
    }

    if (input.trim() === 'atm best long') {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      setIsLoading(true);
      PRUxMRPU_handler(5)
        .then(async (res) => {
          if (res === 'limitWarning') {
            addEntry(
              {
                id: promptMetaData.promptId,
                timestamp: promptMetaData.time,
                date: promptMetaData.date,
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
                    id: responseMetaData.responseId,
                    timestamp: responseMetaData.time,
                    content: await command_response_limitWarning(),
                  }]
              }
            );
            setInput(""); // Clear the input after adding the entry
            setIsLoading(false);
            return;
          } else if (res === true) {
            runBestLong().then((res) => {
              const responseMetaData = getMetaData(); // Get new timestamp for response
              addEntry(
                {
                  id: promptMetaData.promptId,
                  timestamp: promptMetaData.time,
                  date: promptMetaData.date,
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
                      id: responseMetaData.responseId,
                      timestamp: responseMetaData.time,
                      content: command_response_atm_best_long(res),
                    }]
                }
              );
            }, (err) => {
              console.error(err);
            }).finally(() => {
              setInput(""); // Clear the input after adding the entry
              setIsLoading(false);
              return;
            });
          }
        });
    }

    if (input.trim() === 'atm best short') {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      setIsLoading(true);
      PRUxMRPU_handler(5)
        .then(async (res) => {
          if (res === 'limitWarning') {
            addEntry(
              {
                id: promptMetaData.promptId,
                timestamp: promptMetaData.time,
                date: promptMetaData.date,
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
                    id: responseMetaData.responseId,
                    timestamp: responseMetaData.time,
                    content: await command_response_limitWarning(),
                  }]
              }
            );
            setInput(""); // Clear the input after adding the entry
            setIsLoading(false);
            return;
          } else if (res === true) {
            runBestShort().then((res) => {
              const responseMetaData = getMetaData(); // Get new timestamp for response
              addEntry(
                {
                  id: promptMetaData.promptId,
                  timestamp: promptMetaData.time,
                  date: promptMetaData.date,
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
                      id: responseMetaData.responseId,
                      timestamp: responseMetaData.time,
                      content: command_response_atm_best_short(res),
                    }]
                }
              );
            }, (err) => {
              console.error(err);
            }).finally(() => {
              setInput(""); // Clear the input after adding the entry
              setIsLoading(false);
              return;
            });
          }
        });
    }

    if (input.trim().startsWith('atm forecast')) {
      if (userData == null) return;
      const responseMetaData = getMetaData(); // Get new timestamp for response
      setIsLoading(true);
      PRUxMRPU_handler(5)
        .then(async (res) => {
          if (res === 'limitWarning') {
            addEntry(
              {
                id: promptMetaData.promptId,
                timestamp: promptMetaData.time,
                date: promptMetaData.date,
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
                    id: responseMetaData.responseId,
                    timestamp: responseMetaData.time,
                    content: await command_response_limitWarning(),
                  }]
              }
            );
            setInput(""); // Clear the input after adding the entry
            setIsLoading(false);
            return;
          } else if (res === true) {
            runForecastCoin(input.slice('atm forecast'.length).trim()).then((res) => {
              const responseMetaData = getMetaData(); // Get new timestamp for response
              addEntry(
                {
                  id: promptMetaData.promptId,
                  timestamp: promptMetaData.time,
                  date: promptMetaData.date,
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
                      id: responseMetaData.responseId,
                      timestamp: responseMetaData.time,
                      content: command_response_atm_forecast_coin(res),
                    }]
                }
              );
            }, (err) => {
              console.error(err);
            }).finally(() => {
              setInput(""); // Clear the input after adding the entry
              setIsLoading(false);
              return;
            });
          }
        });
    }
  }

  useEffect(() => {
    if (userData === null) {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000);
    }
  }, [])


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
        onChange={(e) => {
          const value = e.target.value;

          if (value.toLowerCase().startsWith('atm forecast')) {
            const prefix = 'atm forecast';
            const rest = value.slice(prefix.length); // everything after prefix
            setInput(`${prefix}${rest.toUpperCase()}`);
          } else {
            setInput(value);
          }
        }}
        onKeyDown={handleKeyDown}
        className="bg-transparent border-none outline-none text-green-200 font-mono w-full"
        autoFocus
      />
      <span className="animate-pulse duration-10 text-green-400">{input.length === 0 ? "█" : ""}</span>
    </div>
  );
});

export default Input;