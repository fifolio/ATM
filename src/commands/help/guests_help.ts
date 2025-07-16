function guests_help() {
    return (
           `
            Available commands:
            atm help     - Show this help message
            atm clear    - Clear the terminal
            atm login    - Log into your account
            atm signup   - Create a new user account
            atm reset p  - Reset your account password  
            atm guide    - How to use the system
            atm readme   - Learn more about this project
        `
    )
} 

export default guests_help;