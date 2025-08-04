import { useLoading } from "../../stores";
import { GET_insights } from "../../apis";
import AI_model from "../lib/AI/AI_model";
import GET_market_insights_prompt from "../lib/AI/prompts/GET_market_insights_prompt";

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




async function runMarketInsights() {

  const { setIsLoading } = useLoading.getState();
  setIsLoading(true);

  let market_insights;

  // Check if database contains a pre-storred today's insights
  const insightsFromDatabase = await GET_insights(new Date().toISOString().split('T')[0]);

  // if database pre-sotrred the requested document, return it 
  if (insightsFromDatabase && insightsFromDatabase.total > 0) {
    market_insights = insightsFromDatabase.documents[0];

    setIsLoading(false);
  } else {
    // if database not pre-storred the requested document, start fetching new market insights, then store it for future calls

    async function fetchMarketSentiment() {
      try {
        // Fetch CoinyBubble sentiment data
        const resp1 = await fetch('https://api.coinybubble.com/v1/latest', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!resp1.ok) {
          throw new Error(`CoinyBubble API error: ${resp1.status} ${resp1.statusText}`);
        }

        const cb = await resp1.json();

        // Fetch Alternative.me global market data (with CORS proxy)
        const resp2 = await fetch('https://corsproxy.io/?https://api.alternative.me/v2/global/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!resp2.ok) {
          throw new Error(`Alternative.me API error: ${resp2.status} ${resp2.statusText}`);
        }

        const am = await resp2.json();

        return {
          cb,
          am
        };
      } catch (error) {
        console.error('Error fetching market sentiment:', (error as Error).message);
        return {
          cb: null,
          am: null,
          error: (error as Error).message
        };
      }
    }

    market_insights = await fetchMarketSentiment();
  }

  // Merge the collected data with Get insights prompts
  const merged_get_insights_prompt_with_collected_data = GET_market_insights_prompt(market_insights as MarketSentimentResponse)

  // Send the collected data to AI model to analyz it
  const AI_insights_report = await AI_model(merged_get_insights_prompt_with_collected_data);


  setIsLoading(false);

  return console.log("Running market insights...", JSON.parse(AI_insights_report));
}

export default runMarketInsights;