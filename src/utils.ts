import { ErrorResponse, Secrets } from "./types";
import * as dotenv from "dotenv";
dotenv.config();

export const buildErrorResponse = (
  code: number,
  message: string,
  err: Error
): ErrorResponse => {
  return {
    status: code,
    message: message,
    error: err.message,
  };
};

export const getSecrets = (): Secrets => {
  return {
    twilioSID: process.env.TWILIO_ACCOUNT_SID || "",
    twilioToken: process.env.TWILIO_AUTH_TOKEN || "",
    twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || "",
    sendgridFromUsername: process.env.SENDGRID_FROM_USERNAME || "",
    sendgridAPIKey: process.env.SENDGRID_API_KEY || "",
    sendgridFromEmail: process.env.SENDGRID_FROM_EMAIL || "",
  };
};
