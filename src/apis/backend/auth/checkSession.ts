import { account } from "../configs/configs";

async function checkSession() {
    try {
        const session = await account.getSession('current');
        return session; // Return the session object on success
    } catch (err) {
        console.error("Session check failed:", err);
        return false; // Return false on failure
    }
}

export default checkSession;
