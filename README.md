# 🪙 GoldDigger

GoldDigger is a backend Node.js application that simulates a live gold investment platform. Built using native Node.js core modules, this project demonstrates foundational server-side concepts including static file streaming, custom routing, data persistence, and real-time streaming updates via Server-Sent Events (SSE).

![GoldDigger Interface Preview](https://drive.google.com/drive/folders/13e4i0lGZ4Su2dw75lSjzu7ZL5RLeRZWk?usp=sharing)

![GoldDigger Live Demo](https://gold-digger-cb9e.onrender.com)

---

## 🚀 Features & Requirements

### Core Functionality
* **Static File Serving:** Robustly delivers the user interface (`HTML`, `CSS`, and frontend `JavaScript`) from the server to the client using native file streams.
* **Third-Party API Integration (`goldapi.io`):** Fetches real-time, accurate market spot prices for 24-karat gold directly from live financial tickers, eliminating static or arbitrary simulated numbers.
* **Live Price Streaming:** Keeps the frontend updated continuously with fluctuating, simulated gold prices using **Server-Sent Events (SSE)**.
* **Transaction Logging:** Automatically captures and processes user purchase intents, logging transaction details directly to a server-side text file (`log.txt`).
* **Interactive Modal Summary:** Dynamically triggers a transaction breakdown window upon successful investments, showing the exact ounces (ozt) acquired relative to the current live asset price.

### Stretch Goals Implemented
* **PDF Receipt Generation:** Compiles individual transaction data into a formal PDF layout upon investment execution.
* **Mock Email Confirmations:** Utilizes simulated email packages to mimic transactional dispatch routines in restricted testing environments.

---

## 🧠 Core Node.js Concepts Covered

This project deep-dives into native Node.js architecture without relying on monolithic abstraction frameworks:

* **HTTP, FS, & Path Modules:** Utilized for spinning up the core server infrastructure, reading/writing files asynchronously, and resolving cross-platform directory segments cleanly.
* **Custom Routing Architecture:** Custom URL parsing logic designed to distinguish between asset requests, form submissions, and long-lived event streams.
* **Event Emitters:** Implements decoupled internal messaging blocks to broadcast system lifecycle flags (e.g., successful logs triggering side-effect streams).
* **Server-Sent Events (SSE):** Sustains an open uni-directional HTTP pipe allowing the server to push live data updates directly to the client view without polling overhead.

---

## 🛠️ Tech Stack & Dependencies

* **Backend Engine:** Node.js (v18+)
* **External APIs:** [GoldAPI.io](https://www.goldapi.io/) (XAU/GBP Spot Price Data)
* **Frontend Interface:** Vanilla JavaScript, Semantic HTML5, Custom CSS Layouts
* **Dependencies:**
    * `pdfkit` 
    * `nodemailer`

---

## 🔒 Security Note
This project uses environment variables to secure the `goldapi.io` token. and authentication for `nodemailer` with `Gmail` To run locally, create a `.env` file in the root directory:
    ```env 
    GOLDAPI=your_actual_api_key_here
    EMAIL_FOR_GMAIL=email_for_your_gmail_account
    PASSWORD_FOR_GMAIL= Your_generated_App_Password_(not your main password)
    PORT=3000
    

## 📦 Installation & Setup

1. Clone this repository to your local environment:
   ```bash
   git clone [https://github.com/assadullahhassan/gold-digger.git](https://github.com/assadullahhassan/gold-digger.git)
   cd gold-digger

### ✍️ Author
   * **Assadullah Hassan**
      - GitHub: [@assadullahhassan](https://github.com/assadullahhassan/)
      - LinkedIn: [Assadullah Hassan](https://www.linkedin.com/in/assadullahhassan)

Made by [Assadullah Hassan](https://scrimba.com/?via=u4f4512)