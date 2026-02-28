# Youth Network Ethiopia | Survey Analytics Hub

A professional Django-based data visualization platform that transforms raw survey data (CSV/Excel) into interactive, actionable insights. Designed specifically for the Youth Network Ethiopia to track engagement, barriers, and training demands.

---

## Key Features
- **Automated Data Pipeline:** Custom management commands to import and clean survey data from `.xlsx` or `.csv`.
- **Dynamic Dashboards:** Real-time charts for Age, Gender, Regional Origin, and Training Heatmaps using **Chart.js**.
- **PDF Report Generation:** One-click functionality to export the analytics dashboard into a professional PDF.
- **Self-Healing Deployment:** Specialized logic for Render/Cloud environments to auto-recreate databases and superusers on startup.

---

## Tech Stack
- **Backend:** [Django 5.1.6](https://www.djangoproject.com/) (Python)
- **Frontend:** HTML5, CSS3 (Glassmorphism UI), Bootstrap 5
- **Visualization:** [Chart.js](https://www.chartjs.org/)
- **Data Handling:** Pandas, NumPy, OpenPyXL
- **Server:** Gunicorn & WhiteNoise (Static file management)
- **Database:** SQLite3 (Configured for easy local portability)

---

## 📂 Project Structure
```text
.
├── analytics/             # Main application logic
│   ├── static/            # CSS & Dashboard JavaScript
│   ├── management/        # Data import scripts
│   └── templates/         # Dashboard HTML
├── survey_analytics/      # Project configuration (settings, wsgi, urls)
├── data
|    |-DNA TECH DATA.xslx     # Source data file
├── manage.py
├── Procfile               # Deployment instructions for Render
└── requirements.txt       # Python dependencies
```

## 💻 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Nardos-serkalem/Survey-Analytics-Dashboard-System.git
cd Survey-Analytics-Dashboard-System

```
##3 Set Up Virtual Environment
```bash
python -m venv venv
```
#### Windows:
```bash
venv\Scripts\activate
```
#### Mac/Linux:
```bash
source venv/bin/activate
```
### Install Dependencies
```bash
pip install -r requirements.txt
```
### Initialize Database & Import Data
```bash
python manage.py migrate
python manage.py survey   
python manage.py createsuperuser
```
### Launch the App
```bash
python manage.py runserver
```
Visit the app at: [`http://127.0.0.1:8000/`](http://127.0.0.1:8000/)


