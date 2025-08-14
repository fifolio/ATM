import { databases, ID } from "../../../configs/configs";


interface BearishCoinData {
    historicalBearishDocID: string;
    symbol: string;
    name: string;
    current_price: number;
    market_cap: number;
    market_cap_rank: number;
    fully_diluted_valuation: number | null;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number | null;
    max_supply: number | null;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;  // ISO date string
    atl: number;
    atl_change_percentage: number;
    atl_date: string;  // ISO date string
    last_updated: string;  // ISO date string
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
}


// This function store today's Bearish coins in database and assign them to its historical document
async function POST_bears(data: BearishCoinData) {
    try {
        const results = await databases.createDocument(
            import.meta.env.VITE_BACKEND_MAIN_DATABASE,
            import.meta.env.VITE_BACKEND_MARKET_BEARS_COLL,
            ID.unique(),
            {
                historicalBearishDocID: data.historicalBearishDocID, // today's historical Bearish coins document ID
                symbol: data.symbol,
                name: data.name,
                current_price: data.current_price,
                market_cap: data.market_cap,
                market_cap_rank: data.market_cap_rank,
                fully_diluted_valuation: data.fully_diluted_valuation,
                total_volume: data.total_volume,
                high_24h: data.high_24h,
                low_24h: data.low_24h,
                price_change_24h: data.price_change_24h,
                price_change_percentage_24h: data.price_change_percentage_24h,
                market_cap_change_24h: data.market_cap_change_24h,
                market_cap_change_percentage_24h: data.market_cap_change_percentage_24h,
                circulating_supply: data.circulating_supply,
                total_supply: data.total_supply,
                max_supply: data.max_supply,
                ath: data.ath,
                ath_change_percentage: data.ath_change_percentage,
                ath_date: data.ath_date,
                atl: data.atl,
                atl_change_percentage: data.atl_change_percentage,
                atl_date: data.atl_date,
                last_updated: data.last_updated,
                price_change_percentage_24h_in_cur: data.price_change_percentage_24h_in_currency,
                price_change_percentage_7d_in_cur: data.price_change_percentage_7d_in_currency,
            }
        );
        return results;
    } catch (err) {
        console.error("Error storing today's Bearish coins:", err);
        return false;
    }
}

export default POST_bears;