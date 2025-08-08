function command_response_users_help() {
    return (
        `
            Available commands:

            [General]
            atm help     - Show this help message.
            atm clear    - Clear the terminal.

            [Account]
            atm logout   - Sign out of the current session.
            atm whoami   - Display current username and email.
            atm details  - Display your account details.

            [Resources]
            atm guide       - Learn how to use automission.ai system.
            atm whitepaper  - Learn more about this project.

            [Predictions]
            atm predict insights  - Access high-level crypto market overviews with future forecasts [Costs 1 RPU].  
            atm predict bulls     - Highlight coins projected to see the strongest gains in value [Costs 1 RPU].  
            atm predict bears     - Reveal assets anticipated to face the steepest declines in value [Costs 1 RPU].  
            atm predict <coin>    - Predicts the future price direction and trend for a specific cryptocurrency [Costs 1 RPU].
            
            -
            Note: Some commands deduct points from your RPU per request.

            `
    )
}

export default command_response_users_help;