import { account } from "../configs/configs";

export default async function completeResetPassword({ userId, secret, newPassword }:
        { userId: string, secret: string, newPassword: string }) {

    const res = await account.updateRecovery(
        `${userId}`,
        `${secret}`,
        `${newPassword}`,
    ).then(() => {
        return true
    }).catch(() => {
        return false
    })

    return res
}