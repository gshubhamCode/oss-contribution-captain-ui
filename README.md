# OSS Contribution Captain UI

![OSS Contribution Captain Logo](./src/assets/logo.avif)

**OSS Contribution Captain UI** is the frontend React application for a unique open-source contributor helper platform designed to empower new contributors to find beginner-friendly issues, understand repositories, and start contributing faster and confidently.

This project aims to **bridge the gap for developers new to open source** by providing curated project lists, AI-generated issue summaries, conversation insights, and an interactive AI chat assistant — all in one easy-to-use interface.

---

## Live On

The project is **deployed and live at:** [https://opencontributioncaptain.com/](https://opencontributioncaptain.com/)

---

## Architecture & Data Fetching

- The UI is **fully independent of any backend service**.  
- All data is fetched from a CDN, making the frontend lightweight and highly scalable.  
- This decoupled architecture allows easy updates and smooth user experience without backend dependencies.

---

## Why OSS Contribution Captain?

Open-source is growing exponentially, but many new contributors find it hard to pick the right project or issue to start with. Our platform, inspired by the need to simplify onboarding in open source, leverages generative AI and smart filtering to provide:

- **Curated beginner-friendly issues** from high-quality repositories  
- **AI-generated summaries** and explanations for issues and conversations  
- **An AI chat assistant** that answers contributor queries about issues, making contribution less intimidating  (Future feature)
- **Efficient discovery and onboarding** in open source projects

---

## Features

- **Issue list with filtering and pagination** for easy browsing  
- **Detailed issue view** with AI-generated summaries  
- **Contextual AI chat** to clarify doubts and guide contributors  
- **Responsive UI** built with React and Chakra UI  
- **Integration with GitHub API and AI services** for real-time data and insights

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)  
- Yarn or npm  
- GitHub personal access token with repo read permissions (optional for enhanced data)

### Installation

```bash
git clone https://github.com/gshubhamCode/oss-contribution-captain-ui.git
cd oss-contribution-captain-ui
npm install

### Running the APP

```bash
npm run dev

Open http://localhost:5173/  to view it in your browser.

### Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page and submit pull requests.

### Connect

Follow the project progress and discussions on LinkedIn.
