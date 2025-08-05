import { account } from "../configs/configs";

type Login = {
    email: string;
    password: string;
};

export async function login({ email, password }: Login) {
    try {
        // Step 1: Log in the user
        const res = await account.createEmailPasswordSession(email, password);

        // Step 2: Fetch user preferences
        const prefs = await account.getPrefs();

        // Step 3: Check and set defaults if needed
        const hasRPU = Object.prototype.hasOwnProperty.call(prefs, 'RPU');
        const hasMRPU = Object.prototype.hasOwnProperty.call(prefs, 'MRPU');
        const resetDate = Object.prototype.hasOwnProperty.call(prefs, 'resetDate');

        // Step 4: Set resetDate default values if they don't exist
        const now = new Date();
        const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        const year = firstOfNextMonth.getFullYear();
        const month = String(firstOfNextMonth.getMonth() + 1).padStart(2, '0');
        const nextMonthDate = `${year}-${month}-01`;

        // Step 5: Auto reset RPU if resetDate is in the past
        const todayStr = now.toISOString().slice(0, 10); // Get current date as 'YYYY-MM-DD'
        if (prefs.resetDate && prefs.resetDate <= todayStr) {
            await account.updatePrefs({
                RPU: 0,
                resetDate: nextMonthDate
            });
        }

        if (!hasRPU || !hasMRPU || !resetDate) {
            await account.updatePrefs({
                RPU: hasRPU ? prefs.RPU : 0,
                MRPU: hasMRPU ? prefs.MRPU : 30,
                resetDate: resetDate ? prefs.resetDate : nextMonthDate
            });
        }

        return {
            success: true,
            data: res,
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
}
