import { useEffect } from "react";
import { useUser, useUserData } from "./stores";
import { checkSession, userData } from "./apis";
import MainLayout from "./layouts/MainLayout";


export default function App() {

  const { setIsLoggedin, setUserId } = useUser();
  const { setUserData } = useUserData();


  // Check if there's an active session
  useEffect(() => {
    async function sessionCheck() {
      try {
        const response = await checkSession();
        setUserId(response && typeof response.userId === "string" ? response.userId : null)
        setIsLoggedin(true);
      } catch (error) {
        console.error("Error checking session:", error);
        setIsLoggedin(false);
      }
    }

    sessionCheck();
  }, []);


  // Fetch user data
  useEffect(() => {
    let isMounted = true;

    async function getUserData() {
      const response = await userData();
      if (response && isMounted) {
        setUserData(response);
      }
    }

    getUserData()

    return () => {
      isMounted = false;
    };
  }, []);



  return (
    <MainLayout />
  )
}
