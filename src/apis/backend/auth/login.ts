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
        const nextMonthDate = `${year}-${month}`;


        if (!hasRPU || !hasMRPU || !resetDate) {
            await account.updatePrefs({
                RPU: hasRPU ? prefs.RPU : 0,
                MRPU: hasMRPU ? prefs.MRPU : 50,
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
