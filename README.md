# 🧪 Testing Workshop: Unit & E2E with Vitest & Playwright

Welcome to this 1-hour workshop on modern frontend testing using **Vitest** for unit tests and **Playwright** for end-to-end (E2E) tests.

---

## 🗂️ Workshop Overview

### 1. 🔺 Testing Pyramid vs. 🏆 Testing Trophy

We’ll begin by reviewing two major mental models in software testing:

#### ✅ Testing Pyramid
- Promotes **more unit tests**, fewer integration and E2E tests.
- Fast, cheap, but less confidence in real-world behavior.

#### 🏆 Testing Trophy (by Kent C. Dodds)
- Focuses on a balanced strategy:
    - Few static tests (lint, types)
    - Many unit tests
    - Moderate integration tests
    - A few high-confidence E2E tests

---

## 💡 Learning Goals

- Understand **where** each type of test fits.
- Write **unit tests with Vitest** for a React component.
- Write **E2E tests with Playwright** for a user flow.
- Understand real vs. mock testing tradeoffs.

---

## 🧱 Project Features

This project has two sample features:

| Feature | Description | Test Type |
|--------|-------------|-----------|
| **Login Page** | A simple login form with validation | ✅ Unit tested with Vitest |
| **User Preferences Form** | A form with dynamic content based on user input | 🔍 E2E tested with Playwright |

---

## 🧪 Part 1: Unit Testing with Vitest

We’ll write unit tests for the **Login Page**:

- Render form elements
- Validate required fields
- Assert success/failure messages

### Run unit tests:

```bash
npm run test:unit
# or with UI:
npx vitest --ui
