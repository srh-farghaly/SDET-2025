## Project Overview

This repository contains a comprehensive QA automation project that performs **UI testing** using **NightwatchJS** and **API testing** using **Supertest** + **Jest**.
It validates critical user flows and API endpoints to ensure both **functionality** and **reliability**.

The project is divided into **four main components**:

### **1- linkedin-registration-automation**

* Automates the LinkedIn registration workflow.
* **Command to run locally**:

```bash

npm run test     # Runs on browser / LinkedIn by default
```

### **2- mock-user-auth-tests**

* Uses the `mock-user-auth` npm module to simulate and validate authentication APIs.
* Tests both **valid** and **invalid** scenarios for secure and correct responses.
* **Command to run locally**:

```bash

npm test
```

### **3- mystore-Automation**

* Performs E2E testing for the **My Store** application.
* Covers homepage search for a certain item.
* **Command to run locally** (example search test):

```bash
npx nightwatch tests/search-dress.js
```

### **4- s3-sample-site-e2e-tests**

* Testing Navigation between different pages.
* **Command to run locally**:

```bash

npm run test
```
---

## Technologies Used

* **NightwatchJS** — End-to-end browser automation
* **Supertest** — HTTP API testing
* **Jest** — JavaScript testing framework for APIs
* **CircleCI** — CI/CD pipeline integration

---

## Running Tests via CircleCI

CircleCI is configured (`.circleci/config.yml`), all UI and API tests will run automatically on each commit.

---

## Test Reports

Each project can be configured to generate **HTML reports** for clear visibility into passed and failed test cases.

* Nightwatch reports → stored in the test output folder.
* Jest API reports → generated via `jest-html-reporter`.
