import { Vonage } from "@vonage/server-sdk";
import dotenv from "dotenv";
dotenv.config();

const vonage = new Vonage({
  apiKey: "12ae77d1",
  apiSecret: "OMsy7jA9SBhDUrhuvHW!E^B"
});

export const sendSMS = async (to, message) => {
  try {
    const response = await vonage.sms.send({
      to,
      from: "KASI KOTAS",
      text: message
    });

    console.log("✅ SMS sent:", response);
  } catch (error) {
    console.error("❌ SMS error:", error);
  }
};