# Survey System: API Docs for frontend team 

## 🌐 Base URL
`http://127.0.0.1:5001/api/v1`

## 🔐 Authentication
This API uses **Session-based Authentication**.
- **Requirement**: You must call the `/auth/login` endpoint first.
- **Protection**: the analytics endpoints require an `admin` role.

---

## 🛠 Authentication Endpoints

### 1. Login
- **URL**: `/auth/login`
- **Method**: `POST`
- **Body (JSON)**:
```json
{
  "username": "admin",
  "password": "your_password"
}
```
- **Returns**: `200 OK` on success, `401 Unauthorized` on failure.

### 2. Status Check
- **URL**: `/auth/status`
- **Method**: `GET`
- **Purpose**: Call this on page refresh to see if the user session is still alive.
- **Returns**:
```json
{
  "authenticated": true,
  "role": "admin",
  "is_admin": true
}
```

---

## 📊 Analytics Endpoints (Admin Only)

### 1. Overview KPIs
- **URL**: `/analytics/overview`
- **Method**: `GET`
- **Returns**:
```json
{
  "total_respondents": 500,
  "awareness_rate": 78.2
}
```

### 2. Demographics
- **URL**: `/analytics/demographics`
- **Method**: `GET`
- **Returns**:
```json
{
  "genders": { "Male": 250, "Female": 250 },
  "subcities": { "Yeka": 100, "Bole": 50, "Arada": 150, "Kirkos": 200 ...etc},
  "education": { 
    "Secondary Education (Grades 9–12)": 50,
    "Tertiary Education (Undergraduate)": 300,
    "Postgraduate Education (Master’s, Doctoral Level)": 150 ...etc}
}
```

### 3. Training Preferences
- **URL**: `/analytics/preferences`
- **Method**: `GET`
- **Returns**:
```json
{
  "topics": { "Digital Skills": 120, "Soft Skills": 80, "Personal development": 50 },
  "timing": { "Morning (8 AM–12 PM)": 40, "Evening (4 PM–8 PM)": 160 },
  "frequency": { "Weekly": 180, "Monthly": 20 }
}
```

### 4. Participation Insights
- **URL**: `/analytics/participation`
- **Method**: `GET`
- **Returns**: Top barriers and motivators.

### 5. Detailed Sources
- **URL**: `/analytics/sources`
- **Method**: `GET`
- **Purpose**: Get counts of where participants heard about YNE.

### 6. Detailed Delivery
- **URL**: `/analytics/delivery`
- **Method**: `GET`
- **Purpose**: Get preferences for training delivery methods (Online, Face-to-Face, etc).

---

## 🏥 System Health
- **URL**: `/health`
- **Method**: `GET`
- **Purpose**: Checks if the backend and database are reachable.
- **Returns**:
```json
{
  "status": "healthy",
  "database": "connected"
}
```
