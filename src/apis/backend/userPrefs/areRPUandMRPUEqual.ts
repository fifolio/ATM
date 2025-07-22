import { account } from "../configs/configs";

export async function areRPUandMRPUEqual() {
    try {
        const prefs = await account.getPrefs();

        const RPU = Number(prefs.RPU);
        const MRPU = Number(prefs.MRPU);

        if (RPU === MRPU) {
            const now = new Date();
            const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const year = firstOfNextMonth.getFullYear();
            const month = String(firstOfNextMonth.getMonth() + 1).padStart(2, '0');
            const resetDate = `${year}-${month}`;

            await account.updatePrefs({ ...prefs, resetDate });
            return 'equal';
        } else {
            return 'not equal';
        }
    } catch (error) {
        console.error("Failed to check RPU and MRPU:", error);
        return 'error';
    }
}


export default areRPUandMRPUEqual;