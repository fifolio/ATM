import { Query, type Models } from "appwrite";
import { databases } from "../../../../configs/configs";

// This function retrieves today's historical market bears from db
async function GET_historical_market_bears(date: string): Promise<false | Models.DocumentList<Models.Document>> {
    try {
        const results = await databases.listDocuments(
            import.meta.env.VITE_BACKEND_MAIN_DATABASE,
            import.meta.env.VITE_BACKEND_HISTORICAL_MARKET_BEARS_COLL,
            [Query.equal('date', date)]
        );
        return results;
    } catch (err) {
        console.error("Error fetching today's historical market bears:", err);
        return false;
    }
}

export default GET_historical_market_bears;