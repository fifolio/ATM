import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useUser, useUserData } from "./stores";
import { checkSession, userData } from "./apis";
import { MainLayout } from "./layouts";
import useHeader from "./stores/header/useHeader";
import areRPUandMRPUEqual from "./apis/backend/userPrefs/areRPUandMRPUEqual";


export default function App() {

  document.title = `Automission.ai (ATM) CLI v${import.meta.env.VITE_VERSION_MAJOR}`

  const { setIsLoggedin, setUserId } = useUser();
  const { setUserData, updateUserData } = useUserData();
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
        // Fetch the recent information related to user's PRU and MRPU 
        areRPUandMRPUEqual();
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
        // Fetch the recent information related to user's PRU and MRPU 
        areRPUandMRPUEqual();
        setUserData(response);
      }
    }

    getUserData()

    return () => {
      isMounted = false;
    };
  }, [updateUserData]);


  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainLayout />} />
        <Route path='*' element={<MainLayout />} />
        <Route path="reset" element={<MainLayout route={'resetPassword_sendResetLink'} />} />
        <Route path="cpr" element={<MainLayout route={'resetPassword_resetInput'} />} />
      </Routes>
    </BrowserRouter>
  )
}
