function command_response_whoami(username: string, email: string) {
    return (
        `
            You are currently logged in as:

              Username : ${username}
              Email    : ${email}
        `
    )
}

export default command_response_whoami;