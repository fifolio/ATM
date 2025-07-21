import { account } from "../configs/configs";

export async function incrementRPU() {
    try {
        // Step 1: Fetch current preferences
        const prefs = await account.getPrefs();

        // Step 2: Ensure RPU exists; if not, default to 0
        const currentRPU = typeof prefs.RPU === 'number' ? prefs.RPU : 0;

        // Step 3: Update RPU by incrementing by 1
        await account.updatePrefs({
            ...prefs,
            RPU: currentRPU + 1,
        });

        return true;
    } catch (error) {
        console.error("Failed to update RPU:", error);
        return false;
    }
}

export default incrementRPU;  