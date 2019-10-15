# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.0.

## Customize app

* Rename all occurrences of `MyApp` and `myApp` on the project to your project name.
* Rename constants in `src/app/core/constants/app.constant.ts` :
  * `APP_NAME` : Your app name.
  * `SERVER_API` : Base url for api (exemple : "/api").
  * `SERVER_USER_INFOS_ROUTE` : Route name for getting user's infos (exemple: "whoami").
  * `BACK_FILE_IMPORT_ATTRIBUTE` : Name of the http header var containing the file.
  * `BACK_ERROR_MESSAGE_ATTRIBUT` : Http's header var for errors messages.
* Change the local URL of your back application in `proxy-local.conf.json`.

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `npm run-script build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Documentation

Run `npm run-script doc` to build the project's documentation. The documentation's files will be stored in the `documentation/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular Starter Pack contact `robin.bobo@scalian.com`.
