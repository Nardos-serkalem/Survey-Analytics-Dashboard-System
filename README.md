# YNE Survey Analytics Dashboard

A high-performance, minimalist analytics platform for the **Youth Network Ethiopia (YNE)** survey initiative. The system handles end-to-end survey collection and data visualization — from public respondents filling in the form to administrators analyzing results in real-time.

---

## 👥 Role-Based Access

The system has two distinct roles with completely separate interfaces:

### 🌐 Public User (Respondent)

Anyone can access the survey — no account required.

| What they can do               | URL                            |
| :----------------------------- | :----------------------------- |
| View the landing / home page   | `http://localhost:5173/`       |
| Fill out and submit the survey | `http://localhost:5173/survey` |

The survey is a multi-step, conditional form. Questions adapt based on previous answers (e.g., awareness channels are only shown to respondents who have heard of YNE). Submissions are stored directly in the database upon completion.

---

### 🔐 Administrator

Admins access a protected analytics dashboard. Authentication is required.

| What they can do             | URL                                     |
| :--------------------------- | :-------------------------------------- |
| Log in to the admin portal   | `http://localhost:5173/login`           |
| View the analytics dashboard | `http://localhost:5173/admin/dashboard` |
| Manage raw database records  | `http://localhost:8000/admin/`          |

**On the Dashboard, the admin can:**

- View **total responses**, completion rate, and month-over-month growth.
- Explore **live charts**: Training Topics, Education Levels, Participation Barriers, Gender Balance, Reach Channels, Regional Distribution.
- Monitor **system health** (live database ping with pulsing status indicator).
- Browse the **most recent submissions** in the Recent Activity table.

## 📊 Core Features

- **Advanced Visualizations** — Bar, Pie, Doughnut, and Area charts powered by Recharts.
- **Smart Label Handling** — Long category names are automatically shortened and rotated to prevent overflow.
- **Parallel API Loading** — All 14 lookup endpoints load simultaneously for a fast dashboard init.
- **Conditional Survey Logic** — Questions are shown/hidden based on previous answers.
- **Live System Health** — Sonar-pulsing OPERATIONAL / DEGRADED badge on the dashboard.
- **Monochrome Design** — Strict Black/Gray/White palette for professional presentation.

---

## 🛠️ Technical Stack

| Layer        | Technology                       |
| :----------- | :------------------------------- |
| Frontend     | React.js, React Router, Recharts |
| Backend      | Django, Django REST Framework    |
| Database     | SQLite (`db.sqlite3`)            |
| Styling      | Vanilla CSS3 with design tokens  |
| Cross-Origin | django-cors-headers              |

---

## 📥 Installation

### Backend

```bash
cd Backend
python -m venv .venv
.venv\Scripts\activate
pip install django djangorestframework django-cors-headers
python manage.py migrate
python manage.py runserver 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

> The frontend runs on **port 5173** and the backend API on **port 8000**.

### For the api documnetation, check the `API_Documentation.md` file.
