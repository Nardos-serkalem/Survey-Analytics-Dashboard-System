# YNE Survey API Documentation 📡

This document provides a comprehensive guide to the REST API endpoints available in the Youth Network Ethiopia (YNE) Survey System. The API is built using Django REST Framework (DRF) and is consumed by the React frontend for data visualization and survey submission.

## 🚀 Base URL
The API base URL is: `http://localhost:8000/api/`

---

## 🛠️ System Health
Check the operational status of the backend and database connection.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/health/` | `GET` | Returns "OPERATIONAL" if the database is connected. |

---

## 📊 Survey Management
Retrieve information about the surveys defined in the system.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/surveys/` | `GET` | List all active surveys (e.g., YNE Training Survey). |
| `/surveys/{id}/` | `GET` | Retrieve details for a specific survey entry. |

---

## 📝 Survey Responses
The core endpoint for recording and analyzing survey data.

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/responses/` | `GET` | List all survey responses (supports filtering). |
| `/responses/` | `POST` | Submit a new survey response from the frontend. |
| `/responses/?survey={slug}` | `GET` | Filter responses by a specific survey slug (e.g., `yne-training-survey`). |

---

## 🔍 Lookup Endpoints (Reference Data)
These endpoints provide the dynamic options used in the survey forms (select menus and multi-select fields). All are `GET` only.

| Endpoint | Description |
| :--- | :--- |
| `/sub-cities/` | List of available Sub-Cities in Addis Ababa. |
| `/education-levels/` | Available educational qualifications (Secondary, Degree, etc.). |
| `/employment-statuses/` | Types of employment (Student, Employed, etc.). |
| `/collection-areas/` | Geographic areas where data was collected. |
| `/time-slots/` | Preferred training times (Morning, Afternoon, etc.). |
| `/frequencies/` | Preferred training frequency (Daily, Weekly, etc.). |
| `/awareness-channels/` | How respondents heard about YNE (M2M). |
| `/important-factors/` | What factors matter most in training (M2M). |
| `/internet-access-modes/` | Methods used to access the web (M2M). |
| `/social-platforms/` | Social media platforms used for training (M2M). |
| `/barriers/` | Significant barriers to participation (M2M). |
| `/training-topics/` | Specific topics of interest for respondents (M2M). |
| `/motivations/` | What motivates respondents to join (M2M). |
| `/delivery-types/` | Preferred formats for training (M2M). |

---

## 🛠️ Technical Notes
- **Authentication**: Admin endpoints require session/token auth; public survey endpoints are open.
- **Content-Type**: All requests and responses use `application/json`.
- **M2M Relationships**: Fields marked with (M2M) accept and return arrays of IDs linked to junction tables.
