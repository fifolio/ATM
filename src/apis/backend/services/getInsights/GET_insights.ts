import { Query } from "appwrite";
import { databases } from "../../configs/configs";

// This function retrieves today's market insights from the database
async function GET_insights(date: string) {
    const results = await databases.listDocuments(
        `${import.meta.env.VITE_BACKEND_MAIN_DATABASE}`,
        `${import.meta.env.VITE_BACKEND_MARKET_INSIGHTS_COLL}`,
        [Query.equal('date', date)]

    ).then((res) => {
        return res
    }).catch((err) => {
        console.error("Error fetching today's insights:", err);
        return false
    })

    return results
}

export default GET_insights;