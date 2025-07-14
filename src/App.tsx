import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useUser, useUserData } from "./stores";
import { checkSession, userData } from "./apis";
import MainLayout from "./layouts/MainLayout";
import useHeader from "./stores/header/useHeader";


export default function App() {

  const { setIsLoggedin, setUserId } = useUser();
  const { setUserData } = useUserData();
  const { setDisplayHelpContext } = useHeader();

  // Check if there's an active session
  useEffect(() => {

    if (window.location.href.includes("reset")) {
      setDisplayHelpContext(false)
    }

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
    <BrowserRouter>
      <Routes>
        <Route index element={<MainLayout />} />
        <Route path='*' element={<MainLayout />} />
        <Route path="reset" element={<MainLayout route={'resetPassword_sendResetLink'} />} />
        <Route 
        path="cpr" // CPR (complete password reset) 
        element={<MainLayout route={'resetPassword_resetInput'} />} />
      
      
      </Routes>
    </BrowserRouter>
  )
}
