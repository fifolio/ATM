import Table from 'cli-table3';

function command_response_atm_predict_insights(data: {
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
  const header = `
╔══════════════════════════════════════════════╗
║           MARKET INSIGHTS REPORT             ║
║                [${data.date}]                  ║
╚══════════════════════════════════════════════╝
`;

  const table = new Table({
    colWidths: [30, 125],   // label column + value column
    wordWrap: true,
    style: { head: [], border: [] },
    chars: {
      'top': '─', 'top-mid': '┬', 'top-left': '┌', 'top-right': '┐',
      'bottom': '─', 'bottom-mid': '┴', 'bottom-left': '└', 'bottom-right': '┘',
      'left': '│', 'left-mid': '├', 'mid': '─', 'mid-mid': '┼',
      'right': '│', 'right-mid': '┤', 'middle': '│'
    }
  });

  // MARKET OVERVIEW
  table.push(
    ['Market Cap', `$${data.market_cap_usd.toLocaleString()}`],
    ['24h Volume', `$${data.volume_usd.toLocaleString()}`],
    ['Active Cryptos', data.active_cryptocurrencies],
    ['Active Markets', data.active_markets]
  );

  // BITCOIN OVERVIEW
  table.push(
    ['BTC Dominance', `${data.btc_dominance}%`],
    ['BTC Price Range', `$${Math.min(data.previous_bitcoin_price_USD, data.bitcoin_price_USD).toLocaleString()} → $${Math.max(data.previous_bitcoin_price_USD, data.bitcoin_price_USD).toLocaleString()}`]
  );

  // SENTIMENT ANALYSIS
  table.push(
    ['Sentiment Score', `${data.sentiment_score} / 100`],
    ['Sentiment Classification', data.sentiment_classification]
  );

  // MARKET TREND SUMMARY
  table.push(
    ['Overall Trend', data.trend_overall_market_trend],
    ['Dominance Impact', data.trend_dominance_influence]
  );

  // MARKET DIRECTION
  table.push(
    ['Current Direction', data.market_direction_current_direction],
    ['Reasoning', data.market_direction_justification]
  );

  // SIGNAL STRENGTH
  table.push(
    ['Signal Classification', data.signal_strength_classification],
    ['Strength Evaluation', data.signal_strength_strength_evaluation]
  );

  return header + table.toString();
}

export default command_response_atm_predict_insights;
