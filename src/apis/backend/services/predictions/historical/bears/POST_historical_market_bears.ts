import { databases, ID } from "../../../../configs/configs";

interface HistoricalMarketBearish {
    date: string;
}

// This function creates today's historical market bears from the database
async function POST_historical_market_bears(data: HistoricalMarketBearish) {
    try {
        const results = await databases.createDocument(
            import.meta.env.VITE_BACKEND_MAIN_DATABASE,
            import.meta.env.VITE_BACKEND_HISTORICAL_MARKET_BEARS_COLL,
            ID.unique(),
            data
        );
        return results;
    } catch (err) {
        console.error("Error posting today's historical market bears:", err);
        return false;
    }
}

export default POST_historical_market_bears;