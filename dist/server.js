"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const mail_1 = __importDefault(require("@sendgrid/mail"));
const twilio_1 = __importDefault(require("twilio"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const PORT = 8080;
app.get("/health", (req, res) => {
    const response = {
        status: 200,
        message: "API is running",
    };
    res.status(response.status).json(response);
});
app.post("/send/sms", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, body } = req.body;
    const secrets = (0, utils_1.getSecrets)();
    if (!to || !body) {
        const err = new Error("Malformed request body");
        const errorResponse = (0, utils_1.buildErrorResponse)(400, "Malformed request body", err);
        return res.status(errorResponse.status).json(errorResponse);
    }
    const client = (0, twilio_1.default)(secrets.twilioSID, secrets.twilioToken);
    try {
        const message = yield client.messages.create({
            body: body,
            from: secrets.twilioPhoneNumber,
            to: to,
        });
        const response = {
            status: 200,
            message: "Successfully sent!",
        };
        res.status(response.status).json(response);
    }
    catch (error) {
        const err = error;
        const errorResponse = (0, utils_1.buildErrorResponse)(500, "Error occurred communicating with Twilio", err);
        res.status(errorResponse.status).json(errorResponse);
    }
}));
app.post("/send/email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { to, body, subject } = req.body;
    const secrets = (0, utils_1.getSecrets)();
    if (!to || !body || !subject) {
        const err = new Error("Malformed request body");
        const errorResponse = (0, utils_1.buildErrorResponse)(400, "Malformed request body", err);
        return res.status(errorResponse.status).json(errorResponse);
    }
    mail_1.default.setApiKey(secrets.sendgridAPIKey);
    const msg = {
        to: to,
        from: secrets.sendgridFromEmail,
        subject: subject,
        text: body,
    };
    try {
        yield mail_1.default.send(msg);
        const response = {
            status: 200,
            message: "Successfully sent!",
        };
        res.status(response.status).json(response);
    }
    catch (error) {
        const err = error;
        const errorResponse = (0, utils_1.buildErrorResponse)(500, "Error occurred sending email", err);
        res.status(errorResponse.status).json(errorResponse);
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
