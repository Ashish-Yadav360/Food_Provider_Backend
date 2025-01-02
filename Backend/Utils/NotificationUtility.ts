export const GenerateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 9000);
  const otpexpire = new Date();
  otpexpire.setTime(new Date().getTime() + 5 * 60000);
  return { otp, otpexpire };
};





// Send OTP


export const RequestOTP = async (phone:string,otp:number)=>{

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require('twilio')(accountSid, authToken);
    const resp =client.messages
    .create({
       body: `Your OTP is ${otp}`,
       from: process.env.TWILIO_PHONE_NUMBER,
       to: `+91${phone}`
     })
    return resp;
}
