import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMS = async (to, message) => {
  try {
    const res = await client.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to
    });

    console.log("✅ SMS sent:", res.sid);
  } catch (err) {
    console.error("❌ SMS error:", err.message);
  }
};