function details(
  username: string,
  email: string,
  emailState: boolean,
  registeredOn: string,
  passwordLatestUpdate: string,
  RPU: number,
  MRPU: number,
  resetDate: string) {
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
              Auto Reset Date             : ${resetDate}
        `
  )
}

export default details;