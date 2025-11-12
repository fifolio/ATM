import Table from 'cli-table3';

interface ExpectedDuration {
    value: number;
    unit: string;
}

interface Recommendations {
    order_type: string;
    leverage_suggested: number;
    notes: string;
}

interface Meta {
    timestamp_utc: string;
    model_version: string;
}

export interface Forecast {
    coin_name: string;
    coin_symbol: string;
    trade_type: 'long' | 'short';
    entry_price: number;
    stop_loss_price: number;
    stop_loss_distance_pct: number;
    take_profit_price: number;
    take_profit_distance_pct: number;
    risk_reward_ratio: number;
    expected_duration: ExpectedDuration;
    confidence_score: number;
    signal_strength: string;
    reasoning_summary: string;
    detailed_rationale: string[];
    red_flags: string[];
    assumptions: string[];
    recommendations: Recommendations;
    meta: Meta;
}

export default function command_response_atm_forecast_coin(forecast: Forecast): string {
    const {
        coin_name,
        coin_symbol,
        trade_type,
        entry_price,
        stop_loss_price,
        stop_loss_distance_pct,
        take_profit_price,
        take_profit_distance_pct,
        risk_reward_ratio,
        expected_duration,
        confidence_score,
        signal_strength,
        reasoning_summary,
        detailed_rationale,
        red_flags,
        assumptions,
        recommendations,
        meta,
    } = forecast;

    const header = `
╔═════════════════════════════════════╗
║  TRADE RECOMMENDATION — ${new Date(meta.timestamp_utc).toISOString().split('T')[0]}  ║
╚═════════════════════════════════════╝
`;

    /* ───────────────────────────────
       1️⃣ MAIN OVERVIEW TABLE
    ─────────────────────────────── */
    const overviewTable = new Table({
        head: ['Coin', 'Symbol', 'Trade Type', 'Signal Strength', 'Confidence Score'],
        wordWrap: true,
        colWidths: [25, 15, 15, 25, 25],
    });

    overviewTable.push([
        coin_name,
        coin_symbol,
        trade_type.toUpperCase(),
        signal_strength,
        `${(confidence_score * 100).toFixed(1)}%`,
    ]);

    /* ───────────────────────────────
       2️⃣ TRADE DETAILS TABLE
    ─────────────────────────────── */
    const tradeTable = new Table({
        head: ['Entry Price', 'Stop Loss', 'SL Distance %', 'Take Profit', 'TP Distance %', 'Risk/Reward', 'Duration (Aprox.)'],
        wordWrap: true,
        colWidths: [15, 15, 15, 15, 15, 15, 20],
    });

    tradeTable.push([
        `$${entry_price}`,
        `$${stop_loss_price}`,
        `${stop_loss_distance_pct}%`,
        `$${take_profit_price}`,
        `${take_profit_distance_pct}%`,
        risk_reward_ratio.toString(),
        `${expected_duration.value} ${expected_duration.unit}`,
    ]);

    /* ───────────────────────────────
       3️⃣ REASONING SUMMARY
    ─────────────────────────────── */
    const summaryTable = new Table({
        head: ['Reasoning Summary'],
        wordWrap: true,
        colWidths: [140],
    });
    summaryTable.push([reasoning_summary]);

    /* ───────────────────────────────
       4️⃣ DETAILED RATIONALE
    ─────────────────────────────── */
    const rationaleTable = new Table({
        head: ['Detailed Rationale'],
        wordWrap: true,
        colWidths: [140],
    });
    detailed_rationale.forEach((item, i) => rationaleTable.push([`${i + 1}. ${item}`]));

    /* ───────────────────────────────
       5️⃣ RED FLAGS / RISKS
    ─────────────────────────────── */
    const redFlagTable = new Table({
        head: ['⚠️ Red Flags / Risks'],
        wordWrap: true,
        colWidths: [140],
    });
    red_flags.forEach((flag, i) => redFlagTable.push([`${i + 1}. ${flag}`]));

    /* ───────────────────────────────
       6️⃣ ASSUMPTIONS
    ─────────────────────────────── */
    const assumptionTable = new Table({
        head: ['Underlying Assumptions'],
        wordWrap: true,
        colWidths: [140],
    });
    assumptions.forEach((assumption, i) => assumptionTable.push([`${i + 1}. ${assumption}`]));

    /* ───────────────────────────────
       7️⃣ RECOMMENDATIONS
    ─────────────────────────────── */
    const recommendationTable = new Table({
        head: ['Execution Recommendations'],
        wordWrap: true,
        colWidths: [140],
    });
    recommendationTable.push([
        `• Order Type: ${recommendations.order_type}\n• Suggested Leverage: ${recommendations.leverage_suggested}x\n\n${recommendations.notes}`,
    ]);

    /* ───────────────────────────────
       FINAL OUTPUT
    ─────────────────────────────── */
    return [
        header,
        overviewTable.toString(),
        tradeTable.toString(),
        summaryTable.toString(),
        rationaleTable.toString(),
        redFlagTable.toString(),
        assumptionTable.toString(),
        recommendationTable.toString(),
    ].join('\n');
}