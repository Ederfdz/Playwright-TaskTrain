## TaskTrain Automation Project | [TripleTen QA Externship EX5](https://tripleten.com/qa-engineer/)

## Getting Started

#### Clone the repository to your local machine:
```
git clone https://github.com/Ederfdz/Playwright-TaskTrain
```

#### Cd into the project directory:
```
cd Playwright\ -\ TaskTrain/
```

#### Download project dependencies:

```
npm install
```

#### If this is your first time using Playwright, you will need to install the browsers.

```
npx playwright install
```
## Running tests

#### Run all tests in chrome:
```
npm run tests:chrome
```
#### Run all tests in firefox:
```
npm run tests:firefox
```
#### Run all tests in safari:
```
npm run tests:safari
```
#### Run a single test file:
```
npx playwright test tests/file-name.spec.ts
```
More info on Playwright's CLI commands [here](https://playwright.dev/docs/test-cli)

## Features

### 1. Page Object Model

Page objects simplify authoring by creating a higher-level API which suits your application and simplify maintenance by capturing element selectors in one place and create reusable code to avoid repetition.

More info on using POM with Playwright [here](https://playwright.dev/docs/pom)


### 2. HTML Report

HTML reporter produces a self-contained folder that contains report for the test run that can be served as a web page.
The report is written into the playwright-report folder. You can open the report after executing tests by running:
```
npx playwright show-report
```
The reporter provides insight on tests such as tests passed, failed, skipped, and flaky tests.
Upon opening an individual test, you will see Test Steps, Screenshots, and Traces.
Playwright Trace Viewer is a GUI tool that helps you explore recorded Playwright traces. More info on Traces [here](https://playwright.dev/docs/trace-viewer)

## Folder Structure

### Pages
Contains all Page Object classes that represent different sections and or pages of the TaskTrain web application.
Some are actual pages e.g.(sign-in-page) and other are sections of the application e.g.(nav-organization).
### Fixtures
By routing all Page Object classes from the 'Pages' folder to the 'TaskTrain Fixture', we centralize access to these functionalities across all tests. This allows us to import only the 'tasktrain-fixture.ts' file within tests, eliminating the need to declare and initialize individual page object files for each test. This approach promotes code reuse and simplifies test maintenance.
### Tests
Contains all feature test files. Are named after corresponding Feature Story file names.

### Other Files

**.env**: file contains variables needed to pass test account information.

**utility.ts**: contains helper functions that can be used across all test files.

**auth-setup.ts**: This file acts as a pre-requisite for all browser projects (Chrome, Firefox, Safari) within the Playwright test suite. It executes before any tests run and generates three JSON files containing authentication cookies. This eliminates the need for individual tests requiring authentication to repeatedly log in. Instead, tests can leverage the stored cookies by utilizing Playwright's storageState feature.

**playwright.config.ts**: contains all configurations for project. 

More info about Playwright's Test Configurations [here](https://playwright.dev/docs/test-configuration) 

## Resources

 [TypeScript](https://www.typescriptlang.org/)

# 🎭 Playwright

[![npm version](https://img.shields.io/npm/v/playwright.svg)](https://www.npmjs.com/package/playwright) <!-- GEN:chromium-version-badge -->[![Chromium version](https://img.shields.io/badge/chromium-121.0.6167.57-blue.svg?logo=google-chrome)](https://www.chromium.org/Home)<!-- GEN:stop --> <!-- GEN:firefox-version-badge -->[![Firefox version](https://img.shields.io/badge/firefox-121.0-blue.svg?logo=firefoxbrowser)](https://www.mozilla.org/en-US/firefox/new/)<!-- GEN:stop --> <!-- GEN:webkit-version-badge -->[![WebKit version](https://img.shields.io/badge/webkit-17.4-blue.svg?logo=safari)](https://webkit.org/)<!-- GEN:stop -->

## [Documentation](https://playwright.dev) | [API reference](https://playwright.dev/docs/api/class-playwright)

Playwright is a framework for Web Testing and Automation. It allows testing [Chromium](https://www.chromium.org/Home), [Firefox](https://www.mozilla.org/en-US/firefox/new/) and [WebKit](https://webkit.org/) with a single API. Playwright is built to enable cross-browser web automation that is **ever-green**, **capable**, **reliable** and **fast**.

|          | Linux | macOS | Windows |
|   :---   | :---: | :---: | :---:   |
| Chromium <!-- GEN:chromium-version -->121.0.6167.57<!-- GEN:stop --> | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| WebKit <!-- GEN:webkit-version -->17.4<!-- GEN:stop --> | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Firefox <!-- GEN:firefox-version -->121.0<!-- GEN:stop --> | :white_check_mark: | :white_check_mark: | :white_check_mark: |

