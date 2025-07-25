function users_help() {
    return (
        `
            Available commands:
            atm help     - Show this help message
            atm clear    - Clear the terminal
            atm logout   - Sign out of the current session
            atm whoami   - Display current username and email
            atm details  - Display your account details
            atm guide    - How to use automission.ai system
            atm readme   - Learn more about this project 
            atm get insights  - Get high-level crypto market insights [Costs 1 RPU]

            -
            Note: Some commands deducts some points of your RPU per request.

            `
    )
}

export default users_help;