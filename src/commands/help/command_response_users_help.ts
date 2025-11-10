function command_response_users_help() {
    return (
        `
            Available commands:

            [GENERAL]
             atm help     - Show this help message.
             atm clear    - Clear the terminal.

            [ACCOUNT]
             atm logout   - Sign out of the current session.
             atm whoami   - Display current username and email.
             atm details  - Display your account details.

            [RESOURCES]
             atm guide       - Learn how to use automission.ai system.
             atm whitepaper  - Learn more about this project.

            [PREDICTIONS]
             atm predict insights  - Access high-level crypto market overviews with future forecasts [Costs 5 RPU].  
             atm predict bulls     - Highlight coins projected to see the strongest gains in value [Costs 5 RPU].  
             atm predict bears     - Reveal assets anticipated to face the steepest declines in value [Costs 5 RPU].  

            [SIGNALS]
             atm best long   - Uncover top coin positioned for strong upward momentum [Costs 5 RPU].  
             atm best short  - Reveal the asset most vulnerable to sharp decline [Costs 5 RPU].  
            
            [FORECASTS]
             atm forecast <COIN>  - Predicts the future price direction and trend for a specific cryptocurrency [Costs 5 RPU].
            
            -
            Note: Some commands deduct points from your RPU per request.

            `
    )
}

export default command_response_users_help;