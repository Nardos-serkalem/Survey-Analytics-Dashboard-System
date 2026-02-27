import json

questions = [
    {
        "id": "consent",
        "label": "Participation Consent",
        "type": "select",
        "options": ["Yes, I consent to participate.", "No"],
        "required": True
    },
    {
        "id": "age",
        "label": "What is your age?",
        "type": "number",
        "required": True
    },
    {
        "id": "gender",
        "label": "Gender",
        "type": "select",
        "options": ["Male", "Female"],
        "required": True
    },
    {
        "id": "sub_city",
        "label": "Which Sub-City do you live in?",
        "type": "select",
        "model": "SubCity",
        "required": True
    },
    {
        "id": "education_level",
        "label": "Highest Level of Education",
        "type": "select",
        "model": "EducationLevel",
        "required": True
    },
    {
        "id": "employment_status",
        "label": "Current Employment Status",
        "type": "select",
        "model": "EmploymentStatus",
        "required": True
    },
    {
        "id": "has_telegram",
        "label": "Do you have a Telegram account?",
        "type": "select",
        "options": ["Yes", "No"],
        "required": True
    },
    {
        "id": "heard_of_yne",
        "label": "Have you ever heard about The Youth Network Ethiopia (YNE)?",
        "type": "select",
        "options": ["Yes", "No"],
        "required": True
    },
    {
        "id": "awareness_channels",
        "label": "How did you first learn about YNE? (Check all that apply)",
        "type": "multi-select",
        "model": "AwarenessChannel"
    },
    {
        "id": "important_factors",
        "label": "Which factors would be most important to you in YNE training? (Check all that apply)",
        "type": "multi-select",
        "model": "ImportantFactor"
    },
    {
        "id": "internet_access_modes",
        "label": "How do you access the internet? (Select all that apply)",
        "type": "multi-select",
        "model": "InternetAccessMode"
    },
    {
        "id": "social_platforms",
        "label": "Which social media platforms have you used for online training? (Select all that apply)",
        "type": "multi-select",
        "model": "SocialPlatform"
    },
    {
        "id": "likelihood_join_score",
        "label": "How likely are you to join a free online training program offered by YNE?",
        "type": "range",
        "min": 1,
        "max": 5,
        "required": True
    },
    {
        "id": "barriers",
        "label": "Significant barriers to participation? (Select all that apply)",
        "type": "multi-select",
        "model": "Barrier"
    },
    {
        "id": "training_topics",
        "label": "Interested in training sessions on the following topics? (Select all that apply)",
        "type": "multi-select",
        "model": "TrainingTopic"
    },
    {
        "id": "motivations",
        "label": "What motivates you to join a free training program? (Select all that apply)",
        "type": "multi-select",
        "model": "Motivation"
    },
    {
        "id": "delivery_types",
        "label": "What type of training delivery do you prefer? (Select all that apply)",
        "type": "multi-select",
        "model": "DeliveryType"
    },
    {
        "id": "preferred_time_slot",
        "label": "What is your preferred time for attending online training sessions?",
        "type": "select",
        "model": "TimeSlot",
        "required": True
    },
    {
        "id": "preferred_frequency",
        "label": "How often would you prefer free online training sessions to be offered?",
        "type": "select",
        "model": "Frequency",
        "required": True
    },
    {
        "id": "certification_importance_score",
        "label": "Likely to attend if they offered certification?",
        "type": "range",
        "min": 1,
        "max": 5,
        "required": True
    },
    {
        "id": "desired_topics_text",
        "label": "What topics or skills would you like free online training sessions to focus on?",
        "type": "text"
    },
    {
        "id": "questionnaire_rating",
        "label": "How do you evaluate the overall questionnaire preparation? (1-5)",
        "type": "range",
        "min": 1,
        "max": 5,
        "required": True
    },
    {
        "id": "questionnaire_feedback",
        "label": "Feedback and recommendations for improving the questionnaire?",
        "type": "textarea"
    },
    {
        "id": "collection_area",
        "label": "Area of Collection",
        "type": "select",
        "model": "CollectionArea",
        "required": True
    }
]

output_path = r'c:\Users\hp\OneDrive\Desktop\Survey\frontend\src\data\questions.json'
with open(output_path, 'w', encoding='utf-8') as f:
    json.dump(questions, f, indent=4)

print(f"Generated {len(questions)} questions in {output_path}")

