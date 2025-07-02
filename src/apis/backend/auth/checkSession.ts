import { account } from "../configs/configs"


async function checkSession() {
    const res = await account.getSession('current')
        .then((res) => {
            return res && true;
        }).catch((err) => {
            return err && false;
        })

    return res;
}

export default checkSession;