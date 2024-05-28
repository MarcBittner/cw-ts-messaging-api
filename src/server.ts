import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { buildErrorResponse, getSecrets } from "./utils";
import {
  MessageRequest,
  Response as ApiResponse,
  ErrorResponse,
  Secrets,
} from "./types";
import sgMail from "@sendgrid/mail";
import twilio from "twilio";

const app = express();
app.use(bodyParser.json());

const PORT = 8080;

app.get("/health", (req: Request, res: Response) => {
  const response: ApiResponse = {
    status: 200,
    message: "API is running",
  };
  res.status(response.status).json(response);
});

app.post("/send/sms", async (req: Request, res: Response) => {
  const { to, body }: MessageRequest = req.body;
  const secrets: Secrets = getSecrets();

  if (!to || !body) {
    const err = new Error("Malformed request body");
    const errorResponse: ErrorResponse = buildErrorResponse(
      400,
      "Malformed request body",
      err
    );
    return res.status(errorResponse.status).json(errorResponse);
  }

  const client = twilio(secrets.twilioSID, secrets.twilioToken);
  try {
    const message = await client.messages.create({
      body: body,
      from: secrets.twilioPhoneNumber,
      to: to,
    });
    const response: ApiResponse = {
      status: 200,
      message: "Successfully sent!",
    };
    res.status(response.status).json(response);
  } catch (error) {
    const err = error as Error;
    const errorResponse: ErrorResponse = buildErrorResponse(
      500,
      "Error occurred communicating with Twilio",
      err
    );
    res.status(errorResponse.status).json(errorResponse);
  }
});

app.post("/send/email", async (req: Request, res: Response) => {
  const { to, body, subject }: MessageRequest = req.body;
  const secrets: Secrets = getSecrets();

  if (!to || !body || !subject) {
    const err = new Error("Malformed request body");
    const errorResponse: ErrorResponse = buildErrorResponse(
      400,
      "Malformed request body",
      err
    );
    return res.status(errorResponse.status).json(errorResponse);
  }

  sgMail.setApiKey(secrets.sendgridAPIKey);
  const msg = {
    to: to,
    from: secrets.sendgridFromEmail,
    subject: subject,
    text: body,
  };

  try {
    await sgMail.send(msg);
    const response: ApiResponse = {
      status: 200,
      message: "Successfully sent!",
    };
    res.status(response.status).json(response);
  } catch (error) {
    const err = error as Error;
    const errorResponse: ErrorResponse = buildErrorResponse(
      500,
      "Error occurred sending email",
      err
    );
    res.status(errorResponse.status).json(errorResponse);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
