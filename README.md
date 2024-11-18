# PepperGame

This project was created for Code Pepper company.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## unit tests

Run `npm run test:unit` to run unit tests.

## e2e tests

It requires few steps:
- run mock server `node e2e.server.js`
- run app in e2e environment `npm run start:e2e`
- run cypress test `npm run test:cypress` or `npm run test:cypress:open`