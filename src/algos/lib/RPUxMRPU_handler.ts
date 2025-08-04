import areRPUandMRPUEqual from "../../apis/backend/userPrefs/areRPUandMRPUEqual";
import incrementRPU from "../../apis/backend/userPrefs/incrementRPU";
import { useUserData } from "../../stores";

export async function PRUxMRPU_handler() {
    const { setUpdateUserData, updateUserData } = useUserData.getState();

    try {
        const res = await areRPUandMRPUEqual();

        if (res === 'not equal') {
            // Await the incrementRPU call directly
            const incRes = await incrementRPU();
            if (incRes === true) {
                setUpdateUserData(!updateUserData);
                return true;
            }
        } else if (res === 'equal') {
            return 'limitWarning';
        } else {
            console.error('Unexpected result when comparing RPU and MRPU:', res);
            return undefined;
        }
    } catch (error) {
        console.error('Error occurred during RPU check/increment:', error);
        return undefined;
    }
}

export default PRUxMRPU_handler;
