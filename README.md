# 🌾 KhetSathi AI

<div align="center">

# KhetSathi AI 🌱

### **AI-Powered Digital Agriculture Companion**

**Empowering farmers with intelligent insights, accessible tools, and a connected agricultural experience.**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-14.2.5-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)](https://supabase.com/)

</div>

---

## 📌 Project Overview

**KhetSathi AI** is a team-built agricultural technology platform that combines **Artificial Intelligence, weather information, market information, alerts, agricultural advisory tools, journaling, calendar-based planning, and personalized user features** into one digital experience.

The project is designed around a simple idea:

> ### 🌱 Make modern technology easier to access and more useful for farmers.

Instead of requiring users to depend on multiple disconnected digital tools, KhetSathi AI brings important agricultural assistance into a single platform.

---

# 🚜 Problem Statement

Agriculture involves continuous decision-making.

Farmers need access to information related to:

- 🌱 Crop and agricultural practices
- 🌦️ Weather conditions
- 💧 Farming conditions and planning
- 💰 Market information
- 🔔 Important alerts
- 📚 Agricultural guidance
- 📅 Farming schedules and activities
- 📝 Records and observations

However, agricultural information can be fragmented across different platforms and may not always be easy to understand or access.

### The Challenge

**How can we build a single, intelligent and accessible digital platform that helps farmers make better-informed decisions?**

---

# 💡 Our Solution

## KhetSathi AI

KhetSathi AI acts as a **digital companion for farmers**.

The platform combines multiple agricultural-focused features with AI and external data services to create a connected experience.

### Our Approach

```text
                 👨‍🌾 FARMER
                     │
                     ▼
             ┌───────────────┐
             │ KhetSathi AI  │
             │   Platform    │
             └───────┬───────┘
                     │
       ┌─────────────┼─────────────┐
       │             │             │
       ▼             ▼             ▼
    Advisory       Weather       Market
       │             │             │
       ├─────────────┼─────────────┤
       │             │             │
       ▼             ▼             ▼
    Alerts        Calendar       Journal
       │             │             │
       └─────────────┼─────────────┘
                     │
                     ▼
              🤖 AI Assistance
                     │
                     ▼
          Better-Informed Decisions
```

---

# ✨ Platform Features

The current project structure includes dedicated application areas for the following features.

## 🤖 1. AI Agricultural Advisory

The Advisory section is designed to provide users with AI-assisted agricultural guidance.

The objective is to make agricultural information easier to understand and turn complex information into practical assistance.

---

## 🌦️ 2. Weather Information

KhetSathi AI integrates an **OpenWeatherMap API** to support weather-related functionality.

This provides the foundation for accessing weather information that can help users understand current and upcoming environmental conditions.

---

## 💰 3. Market Information

The platform includes a dedicated **Market** section.

The project also includes configuration for **data.gov.in**, providing a foundation for accessing Indian government datasets and agricultural information.

---

## 🔔 4. Alerts

The dedicated Alerts section provides a place for important notifications and agricultural information.

It can support information such as:

- Weather alerts
- Crop-related alerts
- Market updates
- Important agricultural notifications

---

## 📅 5. Agricultural Calendar

The Calendar section provides a structured place for users to organize and track agricultural activities.

It helps create a digital planning workflow for farming-related tasks.

---

## 📝 6. Farmer Journal

The Journal feature provides a digital space for users to maintain farming-related notes and records.

It can be used for:

- Crop observations
- Farming activities
- Field notes
- Seasonal records
- Personal agricultural history

---

## 👤 7. User Profile

The platform includes a dedicated Profile section for user-specific information and personalization.

---

## 🔐 8. Authentication

KhetSathi AI uses **NextAuth** with Google OAuth configuration.

This allows the application to support authenticated user experiences.

The project also uses Supabase as part of its backend infrastructure.

---

## 🌐 9. Multilingual Foundation

The project uses:

- `i18next`
- `react-i18next`

This provides a foundation for multilingual experiences and makes it possible to expand the platform for users from different linguistic backgrounds.

---

# 🏗️ Application Architecture

```text
                         ┌────────────────────┐
                         │      FARMER        │
                         └─────────┬──────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │   KhetSathi AI     │
                         │    Next.js App     │
                         └─────────┬──────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
                ▼                  ▼                  ▼
          ┌───────────┐      ┌───────────┐      ┌───────────┐
          │ Advisory  │      │  Weather  │      │  Market   │
          └───────────┘      └───────────┘      └───────────┘
                │                  │                  │
                └──────────────────┼──────────────────┘
                                   │
               ┌───────────────────┼───────────────────┐
               │                   │                   │
               ▼                   ▼                   ▼
          ┌─────────┐         ┌─────────┐        ┌─────────┐
          │ Alerts  │         │Calendar │        │ Journal │
          └─────────┘         └─────────┘        └─────────┘
               │                   │                   │
               └───────────────────┼───────────────────┘
                                   │
                                   ▼
                         ┌────────────────────┐
                         │   Service Layer    │
                         ├────────────────────┤
                         │ Groq AI            │
                         │ OpenWeatherMap     │
                         │ data.gov.in        │
                         │ Supabase            │
                         │ NextAuth / Google  │
                         └────────────────────┘
```

---

# 🧩 Technology Stack

| Technology             | Role                          |
| ---------------------- | ----------------------------- |
| **Next.js 14.2.5**     | Application framework         |
| **React 18**           | Frontend UI                   |
| **TypeScript 5**       | Type-safe development         |
| **Tailwind CSS 3.4.1** | Styling and responsive UI     |
| **Supabase**           | Backend and database services |
| **NextAuth 4.24.14**   | Authentication                |
| **Google OAuth**       | User authentication           |
| **Groq API**           | AI functionality              |
| **OpenWeatherMap**     | Weather data                  |
| **data.gov.in**        | Indian government data        |
| **i18next**            | Internationalization          |
| **React i18next**      | React localization            |
| **Lucide React**       | Icons                         |
| **PostCSS**            | CSS processing                |

---

# 📁 Project Structure

```text
KhetSathi-AI/
│
├── src/
│   │
│   ├── app/
│   │   ├── advisory/
│   │   ├── alerts/
│   │   ├── api/
│   │   ├── auth/
│   │   │   └── signin/
│   │   ├── calendar/
│   │   ├── dashboard/
│   │   ├── features/
│   │   ├── journal/
│   │   ├── market/
│   │   ├── profile/
│   │   ├── SessionProvider.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   └── Reusable UI Components
│   │
│   ├── context/
│   │   └── Application Context
│   │
│   ├── lib/
│   │   └── Utilities & Services
│   │
│   └── middleware.ts
│
├── .gitignore
├── env.example
├── next-env.d.ts
├── next.config
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── README.md
```

---

# 🔌 External Services & APIs

KhetSathi AI integrates with several external services to provide its functionality.

## 🤖 Groq AI

Used for AI-powered functionality.

```env
GROQ_API_KEY=your-groq-api-key
```

---

## 🌦️ OpenWeatherMap

Used for weather-related functionality.

```env
OPENWEATHER_API_KEY=your-openweather-api-key
```

---

## 🇮🇳 data.gov.in

Used as a source for Indian government datasets and agricultural information.

```env
DATA_GOV_API_KEY=your-data-gov-api-key
```

---

## 🗄️ Supabase

Used for backend and database-related functionality.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

---

## 🔐 NextAuth + Google OAuth

The project uses NextAuth with Google OAuth.

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-here

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> ⚠️ Never commit actual API keys, OAuth credentials, passwords, or other secrets to GitHub.

---

# 🚀 How to Clone & Run the Project

Follow the steps below to set up KhetSathi AI on your local machine.

## 1️⃣ Prerequisites

Before starting, make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)
- A code editor such as [VS Code](https://code.visualstudio.com/)

You will also need the required API credentials for the services used by the project.

---

## 2️⃣ Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/shahilmarvadi18-lang/KhetSathi-AI.git
```

---

## 3️⃣ Navigate to the Project

Move into the project directory:

```bash
cd KhetSathi-AI
```

---

## 4️⃣ Open the Project in VS Code

If you are using VS Code, run:

```bash
code .
```

You can also open the `KhetSathi-AI` folder manually in VS Code.

---

## 5️⃣ Install Dependencies

Install all required packages:

```bash
npm install
```

This installs the dependencies defined in `package.json`.

---

## 6️⃣ Configure Environment Variables

Create your local environment file from the provided example:

```bash
cp env.example .env.local
```

Open `.env.local` and add your actual credentials.

The project requires configuration for services such as:

- Groq AI
- OpenWeatherMap
- data.gov.in
- Supabase
- NextAuth
- Google OAuth

> ⚠️ `.env.local` should remain private and must not be committed to GitHub.

---

## 7️⃣ Configure Google OAuth

For local development, configure the Google OAuth callback URL as:

```text
http://localhost:3000/api/auth/callback/google
```

Make sure the same URL is configured in your Google OAuth application.

---

## 8️⃣ Start the Development Server

Run:

```bash
npm run dev
```

After the server starts, open:

```text
http://localhost:3000
```

You should now be able to access the KhetSathi AI application locally.

---

# ⚡ Quick Start

If all required API credentials are already available, the complete setup can be done with:

```bash
git clone https://github.com/shahilmarvadi18-lang/KhetSathi-AI.git
cd KhetSathi-AI
npm install
cp env.example .env.local
npm run dev
```

Then open:

**http://localhost:3000**

---

# 📜 Available Scripts

| Command         | Purpose                      |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the development server |
| `npm run build` | Create a production build    |
| `npm run start` | Start the production server  |
| `npm run lint`  | Run linting                  |

### Development

```bash
npm run dev
```

Starts the Next.js development server.

### Production Build

```bash
npm run build
```

Creates an optimized production build.

### Production Server

```bash
npm run start
```

Starts the application in production mode.

### Linting

```bash
npm run lint
```

Runs the project's linting configuration.

---

# 🎯 Target Users

KhetSathi AI is primarily designed for:

- 👨‍🌾 Farmers
- 🌱 Agricultural learners
- 🧑‍🌾 Farming communities
- 📚 Agriculture-focused organizations
- 🌾 Rural technology initiatives
- 🏛️ Agricultural support ecosystems

---

# 🌍 Social Impact

Agriculture is one of the most important sectors for society, yet access to modern digital tools is not always equal.

KhetSathi AI aims to contribute toward:

### 🌱 Digital Agricultural Access

Bring useful digital agricultural tools together in one platform.

### 🤖 AI-Assisted Decision Support

Use AI to make agricultural information easier to understand and access.

### 🌐 Language Accessibility

Create a foundation for supporting multiple languages and diverse farming communities.

### 🇮🇳 India-Focused Data

Utilize Indian data sources such as data.gov.in where appropriate.

### 💧 Sustainable Farming

Create a foundation for technology-assisted resource management and better agricultural planning.

---

# 🏆 Innovation

KhetSathi AI is more than a standalone AI chatbot.

The platform brings together multiple agricultural workflows:

```text
KhetSathi AI
│
├── 🤖 AI Advisory
├── 🌦️ Weather
├── 💰 Market
├── 🔔 Alerts
├── 📅 Calendar
├── 📝 Journal
├── 👤 Profile
└── 🔐 Authentication
```

This creates the foundation for a **connected agricultural digital ecosystem** rather than a single-purpose application.

---

# 🔐 Security

**Never commit sensitive credentials to GitHub.**

The following information should remain private:

```text
.env.local
API keys
OAuth secrets
Database credentials
Authentication secrets
Access tokens
```

Use the provided `env.example` file to document required configuration without exposing actual credentials.

---

# 🤝 Team Project

KhetSathi AI was developed as a **collaborative team project**.

The project represents the combined work of our team across:

- 💡 Problem identification
- 🔎 Research
- 🎨 UI/UX design
- 💻 Frontend development
- ⚙️ Application development
- 🤖 AI integration
- 🗄️ Backend & database
- 🔐 Authentication
- 🧪 Testing and debugging
- 📢 Presentation
- 📄 Documentation

### 👥 KhetSathi AI Team

> **KhetSathi AI is the result of our team's combined ideas, development, collaboration, and effort toward using technology to address real agricultural challenges.**

---

# 📄 License

This repository currently does not specify an open-source license.

If the team decides to distribute KhetSathi AI as an open-source project, an appropriate license can be added to the repository.

---

# 🔗 Project Repository

### 📦 GitHub

https://github.com/shahilmarvadi18-lang/KhetSathi-AI

---

<div align="center">

# 🌾 KhetSathi AI

### **Empowering Farmers. Enabling Smarter Agriculture.**

**Built by our team with AI, technology, and purpose. 🇮🇳**

<br/>

⭐ **If you find this project interesting, consider starring the repository!**

</div>
