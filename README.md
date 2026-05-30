# 🎭 Playwright Automation Framework

![Playwright Tests](https://github.com/HariChandanaE-QA/playwright-automation-framework/actions/workflows/playwright.yml/badge.svg)
![Node.js](https://img.shields.io/badge/Node.js-20.x-green)
![Playwright](https://img.shields.io/badge/Playwright-1.44.0-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

A production-ready end-to-end test automation framework built with **Playwright** and **JavaScript**, following the **Page Object Model (POM)** design pattern. Includes UI testing, REST API testing, cross-browser execution, and CI/CD integration via **GitHub Actions**.

---

## 📋 Table of Contents

- [Framework Overview](#-framework-overview)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Test Coverage](#-test-coverage)
- [Getting Started](#-getting-started)
- [Running Tests](#-running-tests)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Reports](#-reports)
- [Author](#-author)

---

## 🏗 Framework Overview

| Feature | Details |
|---|---|
| **Architecture** | Page Object Model (POM) |
| **Test Types** | UI (E2E), API, Cross-browser, Mobile |
| **Browsers** | Chromium, Firefox, WebKit, Mobile Chrome |
| **Execution** | Parallel (multi-browser) |
| **CI/CD** | GitHub Actions (on push, PR, scheduled daily) |
| **Reporting** | HTML Report, JUnit XML |
| **Application Under Test** | SauceDemo (UI), ReqRes.in (API) |

---

## 🛠 Tech Stack

- **Test Framework:** Playwright Test
- **Language:** JavaScript (Node.js)
- **Design Pattern:** Page Object Model (POM)
- **CI/CD:** GitHub Actions
- **API Testing:** Playwright APIRequestContext
- **Reporting:** Playwright HTML Reporter, JUnit
- **Version Control:** Git & GitHub

---

## 📁 Project Structure

```
playwright-automation-framework/
│
├── pages/                      # Page Object Model classes
│   ├── LoginPage.js            # Login page interactions
│   ├── ProductsPage.js         # Products/Inventory page
│   ├── CartPage.js             # Shopping cart page
│   └── CheckoutPage.js         # Checkout flow pages
│
├── tests/
│   ├── ui/                     # UI / E2E test specs
│   │   ├── login.spec.js       # Login test cases (TC001–TC007)
│   │   └── checkout.spec.js    # E2E checkout tests (TC008–TC015)
│   └── api/                    # API test specs
│       └── api.spec.js         # REST API tests (TC016–TC024)
│
├── test-data/
│   └── testData.js             # Centralised test data
│
├── reports/                    # Generated test reports (gitignored)
│
├── .github/
│   └── workflows/
│       └── playwright.yml      # GitHub Actions CI/CD pipeline
│
├── playwright.config.js        # Playwright configuration
├── package.json
└── README.md
```

---

## ✅ Test Coverage

### UI Tests — SauceDemo (www.saucedemo.com)

| Test ID | Test Case | Type |
|---|---|---|
| TC001 | Successful login with valid credentials | Positive |
| TC002 | Login fails for locked out user | Negative |
| TC003 | Login fails with invalid credentials | Negative |
| TC004 | Login fails with empty username | Negative |
| TC005 | Login fails with empty password | Negative |
| TC006 | Error message dismissed with close button | Positive |
| TC007 | Login page elements visible on load | Smoke |
| TC008 | Add product to cart updates cart count | Positive |
| TC009 | Multiple products appear correctly in cart | Positive |
| TC010 | Complete E2E checkout flow successfully | E2E |
| TC011 | Remove product from cart | Positive |
| TC012 | Checkout fails when First Name missing | Negative |
| TC013 | Checkout fails when Postal Code missing | Negative |
| TC014 | Sort products by Price: Low to High | Positive |
| TC015 | Sort products by Name: A to Z | Positive |

### API Tests — ReqRes.in (https://reqres.in)

| Test ID | Test Case | Method |
|---|---|---|
| TC016 | GET all users returns 200 | GET |
| TC017 | GET single user returns correct data | GET |
| TC018 | GET non-existent user returns 404 | GET |
| TC019 | POST create user returns 201 | POST |
| TC020 | POST register with valid credentials | POST |
| TC021 | POST register without password returns 400 | POST |
| TC022 | PUT update user returns 200 | PUT |
| TC023 | DELETE user returns 204 | DELETE |
| TC024 | Response contains correct Content-Type | Header |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed → [Download Node.js](https://nodejs.org)
- Git installed → [Download Git](https://git-scm.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/HariChandanaE-QA/playwright-automation-framework.git

# Navigate to project directory
cd playwright-automation-framework

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## ▶️ Running Tests

```bash
# Run all tests
npm test

# Run UI tests only
npm run test:ui

# Run API tests only
npm run test:api

# Run tests in headed mode (visible browser)
npm run test:headed

# Run on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit

# Run specific test file
npx playwright test tests/ui/login.spec.js

# Run tests matching a title
npx playwright test -g "TC010"

# View HTML test report
npm run test:report
```

---

## ⚙️ CI/CD Pipeline

Tests run automatically via **GitHub Actions** on:
- ✅ Every **push** to `main` or `develop`
- ✅ Every **Pull Request** to `main`
- ✅ **Scheduled daily** at 8 AM UTC (regression suite)

The pipeline runs tests in **parallel across all 3 browsers** (Chromium, Firefox, WebKit) and uploads HTML reports as artifacts.

View workflow: [`.github/workflows/playwright.yml`](.github/workflows/playwright.yml)

---

## 📊 Reports

After running tests, open the HTML report:

```bash
npm run test:report
```

Reports are also automatically uploaded as GitHub Actions artifacts after every CI run.

---

## 👩‍💻 Author

**Hari Chandana Earla**
QA Engineer | Manual Testing | Playwright Automation | SDET

- 🔗 LinkedIn: [linkedin.com/in/hari-chandana-earla-a86513168](https://linkedin.com/in/hari-chandana-earla-a86513168)
- 🐙 GitHub: [github.com/HariChandanaE-QA](https://github.com/HariChandanaE-QA)
- 📧 harichandanauk@gmail.com

---

> ⭐ If you found this useful, feel free to star this repository!
