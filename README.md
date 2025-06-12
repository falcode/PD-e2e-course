# 🧪 E2E Testing Workshop with Playwright

Welcome to the End-to-End Testing Workshop!  
In this 1.5-hour session, you'll learn how to write effective E2E tests using [Playwright](https://playwright.dev/) on a dynamic React form application.

---

## 📚 Agenda

### 1. Testing Strategy (15 min)

#### ✅ Testing Pyramid

A classic testing model:
- 🟢 **Unit tests**: fast and abundant
- 🟡 **Integration tests**: fewer, for combined components
- 🔴 **E2E tests**: minimal, slower but simulate real usage

#### 🏆 Testing Trophy (Kent C. Dodds)

A modern testing philosophy:
- 🧹 Static Testing (linters, type checks)
- 🧪 Unit and Integration Testing
- 🧭 Focused E2E Testing

---

## 🛠️ Tech Stack

This workshop includes:
- ⚛️ **React** with Vite and TypeScript
- 💨 **TailwindCSS**
- 🧪 **Playwright** for E2E tests
- 🧱 **JSON Server** to mock API

---

## ⚙️ Getting Started

### 1. Install Dependencies

```bash
npm install
```
### 2. Run the local server
```bash
npm run start:server
```
### 3. Run the application
```bash
npm run dev
```
Access the app at [http://localhost:5173](http://localhost:5173).

## ⏱️ Workshop Flow

- **Intro to E2E + Playwright**
- **Explore the `/form` UI**
- **Write E2E tests in `/tests/Form.spec.ts:`**
  - Loading + error state
  - Basic interactions
  - Edge cases
- **Q&A / Wrap-up**
