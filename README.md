# cw-messaging-api

[![Software License][ico-license]](LICENSE.md)

This is a demo of a golang messaging api for chatterworks. Please contact m@sec.technology if you have any questions

## Limitations

- This code is intended as a POC, and is lacking in many needed production features.
- Although I havce verified that the sms logic pushes a message into twilio's sms queue, I'm waiting on my campaign resistration to process and therefore have not yet been able to valide end-to-end delivery
- /send/linkedin is stubbed but not implemented owing to the fact that linkedin does not appear to expose a public messagaing api: manging its authentication is complex beyond the scope of this demo

## Structure

```
/src/       - code
/README.md  - this file
```

## Setup

The following environment variables need to be set, as explained below:

```bash
TWILIO_ACCOUNT_SID      -- Value of your twilio Accoount identifier
TWILIO_AUTH_TOKEN       -- Value of your twilio Auth Token
TWILIO_PHONE_NUMBER     -- Value of the resigtered phone number used for sending SMS
SENDGRID_FROM_USERNAME  -- The display name from which email will be sent in sendgrid
SENDGRID_API_KEY        -- The sendgrid API key to use when sending emails
SENDGRID_FROM_EMAIL     -- The verified email address to send from in sendgrid
```

Copy the "env" template to .env run install and run as follows:

````bash
$ phaedrus@q.local: ~/gits/cw-messaging-api
[  git: main ] [ Exit: 0 ] [ last: 25.4ms ]$

## Usage

Post to the /send/sms endpoint to send SMS:

```bash
phaedrus@q.local: ~/gits/messaging-api
 [ Exit: 0 ] [ last: 143ms ]$ curl -vvvv POST http://localhost:8080/send/sms -H "Content-Type: application/json" -d '{ "to": "+17346789205",  "body": "SMS Test Message" }'
*   Trying [::1]:8080...
* Connected to localhost (::1) port 8080
> POST /send/sms HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.4.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 53
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< X-Request-Id: uJHFprcPumcNlsSTlsjIlFTJIUgEYfkC
< Date: Wed, 22 May 2024 07:57:08 GMT
< Content-Length: 46
<
{"status":200,"message":"Successfully sent!"}
* Connection #1 to host localhost left intact
````

Post to the /send/email endpoint to send email:

```bash
phaedrus@q.local: ~/gits/cw-messaging-api
 [ Exit: 0 ] [ last: 492ms ]$ curl -vvvv POST http://localhost:8080/send/email -H "Content-Type: application/json" -d '{"to": "marc.bittner@gmail.c om","subject": "Sendgrid Test Email","body": "Sendgrid Test Email"}'
*   Trying [::1]:8080...
* Connected to localhost (::1) port 8080
> POST /send/email HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/8.4.0
> Accept: */*
> Content-Type: application/json
> Content-Length: 95
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< X-Request-Id: oxxGyayrVzSoNSOChzrfCLftXJwlKpSd
< Date: Wed, 22 May 2024 07:56:07 GMT
< Content-Length: 46
<
{"status":200,"message":"Successfully sent!"}
* Connection #1 to host localhost left intact
```

## TODO

The /send/linkedin endpoint is stubbed out but not implemented, owning to the signifigantly higher complexity needed for linkedin authentication

## Security

If you discover any security related issues, please email m@sec.technology instead of using the issue tracker.

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.

[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square
