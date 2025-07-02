import { useEffect } from "react";
import MainLayout from "./layouts/MainLayout";
import { useLoading, useUser } from "./stores";
import { checkSession } from "./apis";
export default function App() {

  const { setIsLoggedin } = useUser();
  const { setIsLoading } = useLoading();

  // Check if there's an active session
  useEffect(() => {
    async function sessionCheck() {
      try {
        const response = await checkSession();
        setIsLoggedin(response);
        setIsLoading(false)
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoggedin(false);
        setIsLoading(false)
      }
    }

    sessionCheck();
  }, [setIsLoggedin]);

  return (
    <MainLayout />
  )
}
