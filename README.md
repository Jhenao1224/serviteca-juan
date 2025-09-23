# Serviteca-Juan

A vehicle maintenance management system (serviteca) project with emphasis on testing. The project includes unit tests using different testing techniques to ensure code correctness, modularity, and maintainability.

---

## 📋 Overview

This repository implements a **serviteca** (auto-workshop) application using TypeScript / Angular (or the framework you used). Its primary focus is on:

- Defining core functionality for service order management, maintenance workflow, etc.
- Applying rigorous **unit testing** strategies to validate individual units of code.
- Leveraging various testing techniques to catch bugs early and improve reliability.

---

## ⚙️ Technologies Used

| **Type** | **Technology / Framework** |
|----------|-----------------------------|
| Front-end / Core Logic | TypeScript, HTML, CSS |
| Testing Framework(s) | *[Insert the test tools you used, e.g. Jasmine, Jest, Mocha, etc.]* |
| Other Tools | *[E.g. Angular CLI, build tools, linting, code formatters]* |

---

## 🔍 Testing Strategies & Techniques

In this project, unit tests cover code using multiple techniques, such as:

- **Mocking / stubbing** of dependencies to isolate units under test.
- **Parameterized tests** (data-driven testing) to test behavior under different input scenarios.
- **Boundary conditions** and edge cases to ensure robustness.
- **Asynchronous code testing**, if your code contains async operations.
- **Test coverage assessment** to identify untested paths or functions.

---

## 📂 Project Structure

serviteca-juan/
├── src/

│ ├── app/

│ │ ├── components/

│ │ ├── services/

│ │ ├── models/

│ │ └── utils/

│ └── tests/ # Unit test files

├── README.md

├── package.json

├── tsconfig.json

└── (other config files)


yaml
Copiar código

---

## 🚀 Getting Started

To set up the project locally and run tests:

1. Clone the repository:

   ```bash
   git clone https://github.com/Jhenao1224/serviteca-juan.git
   cd serviteca-juan
2. Install dependencies:
   ```bash
   npm install   
3. Run test:
   ```bash
   npm test
4. (Optional) View test coverage:
   ```bash
   nom run test:coverage
