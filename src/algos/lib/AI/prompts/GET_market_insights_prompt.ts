interface CoinyBubbleData {
    timestamp: string;
    actual_value: number;
    previous_value: number;
    bitcoin_price_usd: number;
    previous_bitcoin_price_usd: number;
}

interface AlternativeMeQuotes {
    total_market_cap: number;
    total_volume_24h: number;
}

interface AlternativeMeData {
    active_cryptocurrencies: number;
    active_markets: number;
    bitcoin_percentage_of_market_cap: number;
    quotes: {
        USD: AlternativeMeQuotes;
    };
    last_updated: number;
}

interface AlternativeMeMetadata {
    timestamp: number;
    error: string | null;
}

interface AlternativeMeResponse {
    data: AlternativeMeData;
    metadata: AlternativeMeMetadata;
}

interface MarketSentimentResponse {
    cb: CoinyBubbleData | null;
    am: AlternativeMeResponse | null;
    error?: string;
}


export default function GET_market_insights_prompt(data: MarketSentimentResponse) {
    return `
You are an expert financial analyst specializing in cryptocurrency markets. Using the following data, provide a detailed market insight report:

${data}

Instructions:

1. Trend Summary:

* Analyze the overall market trend using the provided data.
* Consider the 24-hour market cap change, volume, and sentiment classification.
* Include insights on how Bitcoin and Ethereum dominance might influence the trend.

2. Market Direction:

* Determine the current market direction: bullish, bearish, or neutral.
* Justify the conclusion using the sentiment score and classification, market cap movement, and trading volume.

3. Signal Strength:

* Evaluate the strength of the market signal based on the data.
* Use metrics such as market cap change, volume, sentiment, and dominance percentages.
* Classify the signal as weak, moderate, or strong.

-
Ensure the analysis is thorough, data-driven, and suitable for professional investors.
* The key-value pairs must be clear text, No symbols included. 
* Return everything in form of a JSON object, following constantly the following structure:

{
  "timestamp": Generated value
  "market_cap_usd": Generated value,
  "volume_usd": Generated value,
  "btc_dominance": Generated value,
  "eth_dominance": Generated value,
  "market_cap_change_24h": Generated value,
  "sentiment_score": Generated value,
  "sentiment_classification": Generated value,
  "trend_summary": {
      "overall_market_trend": Generated value,
      "dominance_influence": Generated value
    },
    "market_direction": {
      "current_direction": Generated value,
      "justification": Generated value
    },
    "signal_strength": {
      "strength_evaluation": Generated value,
      "classification": Generated value
    }
} 

NOTE: Make sure the output is pure JSON output, no \`\`\` json in the beginning nor ends.
    `
};