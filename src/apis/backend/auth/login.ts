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

        if (!hasRPU || !hasMRPU) {
            await account.updatePrefs({
                RPU: hasRPU ? prefs.RPU : 0,
                MRPU: hasMRPU ? prefs.MRPU : 50,
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
