# cw-messaging-api

[![Software License][ico-license]](LICENSE.md)

This is a demo of a golang messaging api for chatterworks. Please contact m@sec.technology if you have any questions

## Limitations

- This code is intended as a POC, and is lacking in many needed production features.
- Although I havce verified that the sms logic pushes a message into twilio's sms queue, I'm waiting on my campaign resistration to process and therefore have not yet been able to valide end-to-end delivery
- /send/linkedin is stubbed but not implemented owing to the fact that linkedin does not appear to expose a public messagaing api: manging its authentication is complex beyond the scope of this demo

## Structure

```
cw-ts-messaging-api/
├── src/
│   ├── types.ts
│   ├── utils.ts
│   └── server.ts
├── env
├──.env
├── package.json
└── tsconfig.json
```

- **cw-ts-messaging-api/** - Root directory of this project
- **src/** - Typescript source files

- **src/types.ts** - Interfaces for the types used in this application
- **src/utils.ts** - Utility functions used in this application
- **src/server.ts** - Sets up the express server and defines the endpoints used in this application
- **/env** - Template for creating the .env file
- **/.env** - Source file for the environment variables to be soruced into the application (format: 'KEY=VALUE', linebreak seperated)
- **project.json** - Project and dependency metadata for npm.
- **tsconfig.json** -Typescript configuration options

- **cw-ts-messaging-api/** - Root directory of this project
  t

---

## Setup

To run this code, perform the following steps:

1. **Clone the repository:**

```bash
git clone https://github.com/MarcBittner/cw-ts-messaging-api.git

```

2. **Install Dependencies**

```bash
cd cw-ts-messaging-api
npm install
```

3. **Setup Environment Variables:**
   Create a copy of of the file 'env' from the root of the repo and name it '.env' Replace the values with those appropriate to your twillio and sendgrid accounts

Exact descrptions of the variables are provided below:

```bash
TWILIO_ACCOUNT_SID      -- Value of your twilio Accoount identifier
TWILIO_AUTH_TOKEN       -- Value of your twilio Auth Token
TWILIO_PHONE_NUMBER     -- Value of the resigtered phone number used for sending SMS
SENDGRID_FROM_USERNAME  -- The display name from which email will be sent in sendgrid
SENDGRID_API_KEY        -- The sendgrid API key to use when sending emails
SENDGRID_FROM_EMAIL     -- The verified email address to send from in sendgrid
```

4. **Compile the Typescript Code**

```bash
npx tsc
```

5. **Start the server using Node.js:**

```bash
node dist/server.js
```

---

## Useage

#### Endpoints

##### Send Email

```bash
POST /send/email

```

**Description:** Sends an email using SendGrid.

**Request Body:**

- **to:** The recipient's email address.
- **body:** The content of the email.
- **subject:** The subject of the email.

* **Example:**

```json
{
  "to": "marc.bittner@gmail.com",
  "body": "Test message sent from cw-ts-messaging-api",
  "subject": "Sent from cw-ts-messaging-api"
}
```

**Response:**

- **Status:** '200 OK'
- **Body:**

```bash
Status: 200 OK
```

**Full Example:**

```bash
[  git: main ] [ Exit: 0 ] [ last: 593ms ]$ curl -X POST -vvvv http://localhost:8080/send/email   -H "Content-Type: application/json"   -d '{"to": "marc.bittner@gmail.com","body": "Test message sent from cw-ts-messaging-api","subject": "Sent from cw-ts-messaging-api"}'
Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying [::1]:8080...
* Connected to localhost (::1) port 8080
> POST /send/email HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.4.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 128
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 45
< ETag: W/"2d-FMeXE0/M3PS+pbtdfUjXGhMdxJY"
< Date: Wed, 29 May 2024 00:27:07 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"status":200,"message":"Successfully sent!"}↵
```

**Error Response:**

- **Status:** '400 Bad Request' or '500 Internal Server Error'

* **Body:**

```json
{
  "status": "<Ërror Status>",
  "message": "Error message describing the issue",
  "error": "Detailed error message"
}
```

##### Send SMS

**Endpoint:**

```bash
POST /send/sms

```

**Description:** Sends an SMS message using Twilio.

**Request Body:**

- **to:** The recipient's phone number.
- **body:** The content of the SMS message.

* **Example:**

```json
{
  "to": "+17346789205",
  "body": "SMS generated form cw-ts-messaging-api"
}
```

**Response:**

- **Status:** '200 OK'
- **Body:**

```bash
Status: 200 OK
```

Body:

````

**Full Example:**

```bash
[  git: main ] [ Exit: 0 ] [ last: 92.4ms ]$ curl -X POST -vvvv  http://localhost:8080/send/sms   -H "Content-Type: application/json"   -d '{ "to": "+17346789205", "body": "SMS generated form cw-ts-messaging-api!" }'
Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying [::1]:8080...
* Connected to localhost (::1) port 8080
> POST /send/sms HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.4.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 75
>
< HTTP/1.1 200 OK
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 45
< ETag: W/"2d-FMeXE0/M3PS+pbtdfUjXGhMdxJY"
< Date: Wed, 29 May 2024 00:34:11 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"status":200,"message":"Successfully sent!"}↵
````

**Error Response:**

- **Status:** '400 Bad Request' or '500 Internal Server Error'

* **Body:**

```json
{
  "status":,"<error_status>"
  "message": "Error message describing the issue",
  "error": "Detailed error message"
}
```

##### Send Linkedin

**Endpoint:**

```bash
POST /send/linkedin

```

**Description:** Stubbed-out endpoint for sending a LinkedIn message. Returns "not implemented".

**Request Body:**

- **to:** Linkedin User ID
- **body:** The text of the linkedin message

* **Example:**

```json
{
  "to": "marc-bittner",
  "body": "Linkedin generated form cw-ts-messaging-api"
}
```

**Response:**

- **Status:** '501 Not Implemented'
- **Body:**

```json
{
  "status": 501,
  "message": "Not Implemented"
}
```

**Full Example:**

```bash
[  git: main ] [ Exit: 0 ] [ last: 587ms ]$ curl -X POST -vvvv  http://localhost:8080/send/linkedin -H "Content-Type: application/json" -d '{ "to": "marc-bittner",  "body": "Linkedin Message" }'
Note: Unnecessary use of -X or --request, POST is already inferred.
*   Trying [::1]:8080...
* Connected to localhost (::1) port 8080
> POST /send/linkedin HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.4.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 53
>
< HTTP/1.1 501 Not Implemented
< X-Powered-By: Express
< Content-Type: application/json; charset=utf-8
< Content-Length: 42
< ETag: W/"2a-G7xjowPFKFVRSalZqANxv3Po3Ho"
< Date: Wed, 29 May 2024 00:39:36 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
<
* Connection #0 to host localhost left intact
{"status":501,"message":"Not Implemented"}↵
```
