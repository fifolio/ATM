import Table from 'cli-table3';


function command_response_atm_predict_bears(
    coins: {
        symbol: string;
        name: string;
        current_price: number;
        high_24h: number;
        low_24h: number;
        price_change_percentage_24h: number;
        price_change_percentage_7d_in_cur: number;
        price_change_percentage_24h_in_cur: number;
        market_cap: number;
        market_cap_rank: number;
        total_volume: number;
        fully_diluted_valuation: number | null;
        price_change_24h: number;
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
    }[]
) {

    const header = `
╔═══════════════════════════════════════════════════════╗
║            TODAY'S BEARISH COINS — ${new Date().toISOString().split('T')[0]}         ║
╚═══════════════════════════════════════════════════════╝
`;

    const table = new Table({
        head: [
            '#',
            'Symbol',
            'Price Range (24h)',
            'Current Price',
            'Price Chg 24h',
            'Market Cap',
            'Rank',
            'Fully Diluted Valuation',
            'Mkt Cap % Chg',
            'Circ Supply',
            'Total Supply',
            'Max Supply',
            'All Time High',
            'All Time Low',
            '24h Volume',
            '24h % Chg Cur',
            '7d % Chg Cur',
            'Last Updated',
            'Name',
        ],
        wordWrap: false
    });

    coins.forEach((coin, index) => {
        table.push([
            index + 1,
            coin.symbol.toUpperCase(),
            `$${coin.low_24h.toLocaleString()} → $${coin.high_24h.toLocaleString()}`,
            `$${coin.current_price.toLocaleString()}`,
            `${coin.price_change_percentage_24h.toFixed(2)}% ($${coin.price_change_24h.toLocaleString()})`,
            `$${coin.market_cap.toLocaleString()}`,
            coin.market_cap_rank,
            coin.fully_diluted_valuation ? `$${coin.fully_diluted_valuation.toLocaleString()}` : "N/A",
            `${coin.market_cap_change_percentage_24h.toFixed(2)}% ($${coin.market_cap_change_24h.toLocaleString()})`,
            coin.circulating_supply.toLocaleString(),
            coin.total_supply ? coin.total_supply.toLocaleString() : "N/A",
            coin.max_supply ? coin.max_supply.toLocaleString() : "N/A",
            `$${coin.ath.toLocaleString()} (${coin.ath_change_percentage.toFixed(2)}%) on ${new Date(coin.ath_date).toLocaleDateString()}`,
            `$${coin.atl.toLocaleString()} (${coin.atl_change_percentage.toFixed(2)}%) on ${new Date(coin.atl_date).toLocaleDateString()}`,
            `$${coin.total_volume.toLocaleString()}`,
            `${coin.price_change_percentage_24h_in_cur}`,
            `${coin.price_change_percentage_7d_in_cur}`,
            new Date(coin.last_updated).toLocaleString(),
            coin.name,
        ]);
    });

    return header + table.toString();
}

export default command_response_atm_predict_bears;