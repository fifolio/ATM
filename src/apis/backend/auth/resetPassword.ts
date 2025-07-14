import { account } from "../configs/configs";

export async function resetPassword(email: string) {
    try {
        const res = await account.createRecovery(
            email,
            `${window.location.origin}/cpr`
        );
        return {
            success: true,
            data: res,
        };
    } catch (error) {
        return {
            success: false,
            error: error,
        };
    }
}


export default resetPassword;