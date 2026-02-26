# 📊 Survey Analytics Dashboard

A full-stack data visualization platform built to transform raw Excel survey data into actionable insights. This project features a React-based frontend and a Django REST Framework backend, deployed on AWS EC2 using Nginx.

## 🚀 Live Demo
URL: [http://13.218.123.136/](http://13.218.123.136/)  

## 🛠 Tech Stack
- Frontend: React.js, Tailwind CSS, Chart.js/Recharts, Axios
- Backend: Django, Django REST Framework, Pandas (Data Processing)
- Database: SQLite (Development/MVP)
- Deployment: AWS EC2 (Ubuntu), Nginx, Gunicorn/Nohup

## ✨ Key Features
- Excel Import: Seamlessly upload .xlsx survey results.
- Dynamic Analytics: Automated calculation of demographics and response trends.
- Live Status Monitoring: Real-time backend connectivity check.
- Responsive Design: Optimized for both desktop and mobile viewing.

## 📂 Project Structure
```text
├── survey_backend/          # Django Project
│   ├── analytics/           # API Logic & Excel Processing
│   ├── core/                # Settings & Routing
│   └── manage.py
├── survey_frontend/         # React Project
│   ├── src/                 # Components & App Logic
│   └── build/               # Production Build Files
└── nginx/                   # Configuration files
