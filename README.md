# 🧠 RealTalk AI

**RealTalk AI** is a full-stack AI-powered messaging assistant that helps you craft better replies across platforms. Powered by LLMs, it suggests responses in real-time based on your preferred tone, creativity, and platform. Includes full analytics, history tracking, and a Chrome extension for seamless use across the web.

---

## 🚀 Features

- ✨ **LLM-powered Suggestions** (supports multiple models like `phi`, `default`)
- ⚙️ **Personalized Settings** – tone, platform, creativity level, model preference
- 📊 **User Analytics** – track model usage and activity
- 🕓 **History Log** – view previous inputs and generated responses
- 🌐 **Chrome Extension** – bring RealTalk AI to any text field on the web
- 👥 **User Registration** – register and fetch user-specific content

---

## 🖼️ UI Preview

![Dashboard Screenshot](./screenshots/dashboard.png)
![Chrome Extension](./screenshots/extension.png)

---

## 🛠️ Tech Stack

| Layer      | Technology                         |
|------------|-------------------------------------|
| Frontend   | React, Tailwind CSS, Shadcn
---

## ⚡ API Endpoints (FastAPI)

| Endpoint                  | Method | Description                      |
|---------------------------|--------|----------------------------------|
| `/api/suggest`           | POST   | Generate LLM suggestions         |
| `/api/history/{user_id}` | GET    | Fetch message history            |
| `/api/analytics`         | GET    | Get user analytics               |
| `/api/register`          | POST   | Register a new user              |
| `/api/users`             | GET    | Get all registered users         |
| `/api/settings`          | POST   | Save user settings               |
| `/api/settings/{id}`     | GET    | Fetch user settings              |

---


### Future Enhancements
 OAuth / JWT Auth

 GPT-4o or Claude Integration

 Real-time feedback loop from suggestions

 Cross-device sync


### Backend

```bash
cd backend
uvicorn main:app --reload
/UI      |
| Backend    | FastAPI, Python                     |
| Database   | SQLite                              |
| LLM        | Phi Model/ OpenAi           |
| Extension  | Chrome Manifest V3, JS              |



---




