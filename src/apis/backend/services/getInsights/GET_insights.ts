import { Query, type Models } from "appwrite";
import { databases } from "../../configs/configs";

// This function retrieves today's market insights from the database
async function GET_insights(date: string): Promise<false | Models.DocumentList<Models.Document>> {
    try {
        const results = await databases.listDocuments(
            import.meta.env.VITE_BACKEND_MAIN_DATABASE,
            import.meta.env.VITE_BACKEND_MARKET_INSIGHTS_COLL,
            [Query.equal('date', date)]
        );
        return results;
    } catch (err) {
        console.error("Error fetching today's insights:", err);
        return false;
    }
}

export default GET_insights;