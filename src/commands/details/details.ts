function details(
    username: string,
    email: string,
    emailState: boolean,
    registeredOn: string,
    passwordLatestUpdate: string,
    RPU: number,
    MRPU: number) {
    return (
        `
            ACCOUNT DETAILS
              Username              : ${username}
              Email                 : ${email}
              Email Verified        : ${emailState}
              Registered On         : ${registeredOn}
              Password Last Updated : ${passwordLatestUpdate}
 
            USAGE 
              Requests Used (RPU)         : ${RPU}
              Max Requests Allowed (MRPU) : ${MRPU}
        `
    )
}

export default details;