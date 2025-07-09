import { account } from "../configs/configs";

async function userData() {
    try {
        const metadata = await account.get();
        return metadata; // Return the user account details object on success
    } catch (err) {
        console.error("User Metadata check failed:", err);
        return false; // Return false on failure
    }
}

export default userData;
