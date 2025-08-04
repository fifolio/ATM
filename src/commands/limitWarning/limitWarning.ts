import { account } from "../../apis/backend/configs/configs";

async function limitWarning() {

    const prefs = await account.getPrefs();

    return (
        `
            You've Reached Your Monthly Limit

                You have used all your available RPU (Requests Per User) points for this month.
                Further requests like "atm predict <...>" are currently disabled.
                    
                Your quota will reset automatically on: ${prefs.resetDate}
                You can check your current usage with the "atm details" command.
                    
                Tip: You can continue using all free commands in the meantime.
                Thanks for using Automission.ai!
        `
    )
}

export default limitWarning;