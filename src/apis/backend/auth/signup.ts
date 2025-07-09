import { account, ID } from "../configs/configs";

type Signup = {
    email: string;
    password: string;
    username: string;
};

export async function signup({ email, password, username }: Signup) {
    try {
        const res = await account.create(
            ID.unique(),
            email,
            password,
            username
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
