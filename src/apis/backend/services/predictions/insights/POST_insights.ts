import { databases, ID } from "../../../configs/configs";

interface MarketInsightsData {
    date: string;
    timestamp: string; // ISO 8601 datetime string (e.g. "2025-08-06T09:03:05.447769Z")
    market_cap_usd: number;
    volume_usd: number;
    btc_dominance: number;
    sentiment_score: number;
    sentiment_classification: string;
    bitcoin_price_USD: number;
    previous_bitcoin_price_USD: number;
    active_cryptocurrencies: number;
    active_markets: number;

    // Flattened trend_summary
    trend_overall_market_trend: string;
    trend_dominance_influence: string;

    // Flattened market_direction
    market_direction_current_direction: string;
    market_direction_justification: string;

    // Flattened signal_strength
    signal_strength_strength_evaluation: string;
    signal_strength_classification: string;
}


// This function creates today's market insights from the database
async function POST_insights(data: MarketInsightsData) {
    try {
        const results = await databases.createDocument(
            import.meta.env.VITE_BACKEND_MAIN_DATABASE,
            import.meta.env.VITE_BACKEND_MARKET_INSIGHTS_COLL,
            ID.unique(),
            data
        );
        return results && true;
    } catch (err) {
        console.error("Error posting today's insights:", err);
        return false;
    }
}

export default POST_insights;