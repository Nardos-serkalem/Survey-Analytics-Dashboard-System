"""
EXPLANATION: Survey Analytics Dashboard System Architecture
-----------------------------------------------------------
This script explains the professional Flask structure, the execution flow, 
and the purpose of each file for your defense.

1. PROJECT STRUCTURE OVERVIEW
-----------------------------
Survey-Analytics-Dashboard-System/
├── app/                    # Main Application Package
│   ├── api/                # API Layer (Flask-RESTful)
│   │   ├── __init__.py     # Registry for API Blueprints & Resources
│   │   └── resources.py    # Endpoint logic (Health, Respondents, etc.)
│   ├── models/             # Database Layer (SQLAlchemy)
│   │   ├── __init__.py     # Model exports
│   │   └── models.py       # Core 3NF Schema (Respondents, Submissions, etc.)
│   ├── services/           # Business Logic Layer
│   │   └── security.py     # Input validation & security utilities
│   └── __init__.py         # Application Factory (create_app)
├── instance/               # Local-only files (Database file resides here)
├── tests/                  # Automated Test Suite
├── .env                    # Environment Variables (Secrets, DB URLs)
├── config.py               # Centralized Configuration Management
├── manage.py               # CLI Tool for DB Operations (init, reset, inspect)
├── run.py                  # Main Entry Point (Starting the server)
├── seed.py                 # Data Population Script (Mock data generation)
└── requirements.txt        # Project Dependencies

2. EXECUTION FLOW (Step-by-Step)
--------------------------------
Step A: Starting the App (run.py)
   - You run `python run.py`.
   - It reads the `FLASK_ENV` from `.env` (it's set to 'development').
   - It calls `create_app('development')` from the `app` package.

Step B: The Factory (app/__init__.py)
   - `create_app` loads the configuration from `config.py` based on the environment name.
   - It initializes the Database (SQLAlchemy) using the `DATABASE_URL` from `.env`.
   - It registers the API Blueprint from `app/api/`.

Step C: Routing (app/api/__init__.py)
   - The API Blueprint attaches the Resources defined in `resources.py` to specific URLs.
   - Example: `/api/v1/health` maps to the `HealthCheck` class.

Step D: Database Interaction (app/models/models.py)
   - When an API is called (e.g., getting respondents), the code uses the models in `models.py`.
   - It queries the `dna_survey_dev.db` file (SQLite) located in the `instance/` folder.

3. ARCHITECTURAL DECISIONS (Key Points for Defense)
--------------------------------------------------
- Separation of Concerns: Logic is split into API (routes), Models (data), and Services (validation). 
  This makes the system scalable and easy to test.
- 3rd Normal Form (3NF): The database is highly optimized to prevent data redundancy.
- Environment Safety: Sensitive data like `SECRET_KEY` is stored in `.env`, not hardcoded in the logic.
- RESTful Standards: Using `Flask-RESTful` ensures the API follows professional industry standards, 
  making it easy for the Frontend team to consume.
- Python 3.13 Readiness: codebase uses modern datetime handling (timezone-aware) 
  to be compatible with the latest Python versions.

4. HOW TO RUN
-------------
1. Initialize DB: `python manage.py init`
2. Seed Data: `python seed.py`
3. Run Server: `python run.py` (Server will be on http://127.0.0.1:5001)
"""

if __name__ == "__main__":
    print("Reading Architectural Explanation...")
    import sys
    print(sys.modules[__name__].__doc__)
