import { account } from "../configs/configs"

type Login = {
    email: string,
    password: string,
}

export async function login({ email, password }: Login) {
    try {
        const res = await account.createEmailPasswordSession(email, password);
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
