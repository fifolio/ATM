import { account, ID } from "../configs/configs";

type Signup = {
    email: string,
    password: string,
    username: string,
}

export async function signup({ email, password, username }: Signup) {

    const res = await account.create(
        ID.unique(),
        email,
        password,
        username
    ).then((res) => {
        return res
    }).catch((err) => {
        return err.type
    })

    return res
}