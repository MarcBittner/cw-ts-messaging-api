export interface Response {
  status: number;
  message: string;
}

export interface ErrorResponse extends Response {
  error: string;
}

export interface MessageRequest {
  to: string;
  body: string;
  subject?: string;
}

export interface Secrets {
  twilioSID: string;
  twilioToken: string;
  twilioPhoneNumber: string;
  sendgridFromUsername: string;
  sendgridAPIKey: string;
  sendgridFromEmail: string;
}
