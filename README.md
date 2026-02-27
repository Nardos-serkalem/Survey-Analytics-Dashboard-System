
#Survey Analytics Dashboard (Frontend)

This project delivers a structured analytics dashboard using mock, aggregated survey data. It focuses on information hierarchy, reusable components, and API-ready data shapes.

##What This Dashboard Answers

1 How many people responded?
2 Who are they (demographics)?
3 Do they know YNE?
4 Will they participate?
5 What do they prefer?

##Frontend Information Architecture

-Executive overview KPI row (total respondents, awareness %, likely to join %, Telegram %)
-Demographics (gender, age, education, employment, subcity)
-Awareness & outreach (heard about YNE, channels, Telegram usage)
-Participation insights (likelihood, barriers, motivations, certification impact)
-Training preferences (delivery type, time, frequency, topics)
-Qualitative data is summarized as a count only

##Data Modeling 

Key tables to support multi-select questions and aggregation:

-respondent (id, age, gender, subcity, education_level, employment_status, area_of_collection, created_at)
-question (id, label, type, section)
-option (id, question_id, label)
-response (id, respondent_id, question_id)
-response_option (response_id, option_id) for multi-select
-response_text (response_id, value) for open text

Multi-select aggregation example: count selections by option_id.

##Table Structure Explanation

respondent
-One row per person who answered the survey.
-Stores demographics and collection context.

question
-One row per question in the survey.
-Type is single, multi, or text.

option
-Stores answer choices for single or multi questions.
-Linked to question by question_id.

response
-Connects a respondent to a question.
-One response row per question answered.

response_option
-Stores selected options for single or multi responses.
-One row per selected option.

response_text
-Stores free-text answers.
-Kept separate to avoid mixing with quantitative analytics.

##API Design 
-GET /api/overview
	-Returns KPI totals and percentages
-GET /api/demographics
	-Gender, age groups, subcity, education, employment
-GET /api/awareness
	-Awareness rate, channels, Telegram usage
-GET /api/digital-access
	-Internet access methods, training platforms
-GET /api/participation
	-Likelihood, barriers, motivations, certification impact
-GET /api/training-preferences
	-Delivery type, preferred time, frequency, top topics
-GET /api/qualitative-summary
	-Count of open feedback responses only

Frontend consumes aggregated objects directly (no raw responses).

##Security 

 -Authentication: JWT(recommended)or session-based login
 -Role-based access: admin vs viewer
 -Input validation: schema validation for all requests
 -Rate limiting for public endpoints -this increases performance and availability
 -Audit logs for admin actions
 -AllowListing 
 -Use api gateway this creates a centralized managment 
 -use https for api communication
 -OAuth2 and webauthentication
 -api keys (rotate them periodically) 
 -Error handling(don't expose the internal code )

###FRONTEND STRUCTURE

src/
	components/
		ChartCard.jsx
		Header.jsx
		StatCard.jsx
	mock/
		mockdata.jsx
	pages/
		Dashboard.jsx
	Sections/
		Awareness.jsx
		Demographics.jsx
		DigitalAccess.jsx
		Participation.jsx
		Training.jsx
    

##Run Locally
npm install
npm run dev
