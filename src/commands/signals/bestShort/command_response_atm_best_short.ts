import Table from 'cli-table3';

function command_response_atm_best_short(
    bestShort:
        | { coin: string; symbol: string; market_sentiment: string; reasoning: string; signal_strength: string }
        | { coin: string; symbol: string; market_sentiment: string; reasoning: string; signal_strength: string }[]
) {
    const data = Array.isArray(bestShort) ? bestShort : [bestShort];

    const header = `
╔═════════════════════════════════════════════════╗
║ BEST SHORT POSITION RECOMMENDATION — ${new Date().toISOString().split('T')[0]} ║
╚═════════════════════════════════════════════════╝
`;

    // First table — main recommendation data
    const table = new Table({
        head: ['#', 'Coin', 'Symbol', 'Market Sentiment', 'Reasoning', 'Signal Strength'],
        wordWrap: true,
        colWidths: [3, 25, 10, 20, 73, 20],
    });

    data.forEach((coin, index) => {
        table.push([
            index + 1,
            coin.coin,
            coin.symbol.toUpperCase(),
            coin.market_sentiment,
            coin.reasoning,
            coin.signal_strength,
        ]);
    });

    // Second table — AI forecast tip message
    const forecastTable = new Table({
        wordWrap: true,
        colWidths: [156],
    });

    data.forEach((coin) => {
        forecastTable.push([
            `💡 Type "atm forecast ${coin.symbol.toUpperCase()}" to activate Automission.ai’s analytical AI engine and get a complete market forecast — including optimal entry and exit price levels, suggested position duration, and detailed price movement insights — all designed to give you a sharper trading edge.`,
        ]);
    })


    return header + table.toString() + '\n' + forecastTable.toString();
}

export default command_response_atm_best_short;
