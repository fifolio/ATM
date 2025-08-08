function command_response_market_insights(data: {
  date: string;
  market_cap_usd: number;
  volume_usd: number;
  btc_dominance: number;
  sentiment_score: number;
  sentiment_classification: string;
  bitcoin_price_USD: number;
  previous_bitcoin_price_USD: number;
  active_cryptocurrencies: number;
  active_markets: number;
  trend_overall_market_trend: string;
  trend_dominance_influence: string;
  market_direction_current_direction: string;
  market_direction_justification: string;
  signal_strength_strength_evaluation: number;
  signal_strength_classification: string;
}) {
  return `
══════════════════════════════════════════════
           MARKET INSIGHTS REPORT
               [${data.date}]
══════════════════════════════════════════════

MARKET OVERVIEW
──────────────────────────────────────────────
• Market Cap        : $${data.market_cap_usd.toLocaleString()}
• 24h Volume        : $${data.volume_usd.toLocaleString()}
• Active Cryptos    : ${data.active_cryptocurrencies}
• Active Markets    : ${data.active_markets}

BITCOIN OVERVIEW

• BTC Dominance     : ${data.btc_dominance}%
• BTC Price Range   : $${Math.min(data.previous_bitcoin_price_USD, data.bitcoin_price_USD).toLocaleString()} → $${Math.max(data.previous_bitcoin_price_USD, data.bitcoin_price_USD).toLocaleString()}

SENTIMENT ANALYSIS

• Score             : ${data.sentiment_score} / 100
• Classification    : ${data.sentiment_classification}

MARKET TREND SUMMARY
──────────────────────────────────────────────
• Overall Trend     : ${data.trend_overall_market_trend}

• Dominance Impact  : ${data.trend_dominance_influence}

MARKET DIRECTION
──────────────────────────────────────────────
• Current Direction : ${data.market_direction_current_direction}
• Reasoning         : ${data.market_direction_justification}

SIGNAL STRENGTH
──────────────────────────────────────────────
• Classification    : ${data.signal_strength_classification}
• Evaluation        : ${data.signal_strength_strength_evaluation}

`;
}

export default command_response_market_insights;
