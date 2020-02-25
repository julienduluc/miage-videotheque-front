# 2.0.0 (2010-02-25)

### Bug Fixes

* **Test:** Test now works

### Features

* **Tests:** Added Jest
* **CI:** CI now runs jest tests and show test coverage

### BREAKING CHANGES

* **Build:** Angular 9 and ivy is now used

# 1.1.2 (2019-10-17)

### Bug Fixes

* **Docker:** Removed command in error

### Code Refactoring

* **Renaming:** Generic `myapp` name

### BREAKING CHANGES

* **Build:** Changed build path and base href to `./`

# 1.1.1 (2019-10-10)

### Bug Fixes

* **Authentication:** Removed unnecessary call to /whoami when you're on login page.

### Features

* **Documentation:** Added Compodoc --> use npm run-script doc to generate docs.
* **Path:** Added shortcut for TypeScript and SCSS imports.
* **library:** Updated angular-fontawesome version to 0.5.0.

# 1.1.0 (2019-10-10)


### Features

* **Configuration:** VS Code config and recommended extensions added.
* **Debugging:** Debugging config added.

# 1.0.0 (2019-08-30)


### Features

* **Authentication:** JWT authentication handled.
* **Layout:** Header and footer.
* **Errors:** HTTP errors automatically handled.
* **Message:** Messaging serving through toast.
* **Files:** Download and upload service/component includes.
* **Loader:** Automatic loader when calling http requests.
* **Internationalization:** Using ngx-translate.
