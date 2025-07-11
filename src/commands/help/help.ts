function help() {
    return (
           `
            Available commands:
            atm help     - Show this help message
            atm clear    - Clear the terminal
            atm login    - Log into your account
            atm signup   - Create a new user account
            atm logout   - Sign out of the current session
            atm reset p  - Reset your account password  
            atm whoami   - Display current username and email
            atm details  - Display your account details
            atm guide    - How to use the system
            atm readme   - Learn more about this project
        `
    )
} 

export default help;