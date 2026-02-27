import os
import django
import json

# Set up Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from Servey_App.models import (
    SubCity, EducationLevel, EmploymentStatus, AwarenessChannel,
    Barrier, TrainingTopic, Survey, ImportantFactor, InternetAccessMode,
    SocialPlatform, Motivation, DeliveryType, TimeSlot, Frequency, CollectionArea
)

def seed_data():
    print("Seeding database with comprehensive survey options...")

    # Load options from JSON if available, else use defaults
    options_path = r'c:\Users\hp\OneDrive\Desktop\Survey\survey_options.json'
    if os.path.exists(options_path):
        with open(options_path, 'r', encoding='utf-8') as f:
            options = json.load(f)
    else:
        print("Warning: survey_options.json not found. Using minimal defaults.")
        options = {}

    # Helper to seed simple models
    def seed_model(model_class, field_name, values):
        for val in values:
            model_class.objects.get_or_create(**{field_name: val})

    # Seeding based on extracted data
    seed_model(SubCity, 'name', options.get('SubCity', []))
    seed_model(EducationLevel, 'name', options.get('EducationLevel', []))
    seed_model(EmploymentStatus, 'name', options.get('EmploymentStatus', []))
    seed_model(AwarenessChannel, 'label', options.get('AwarenessChannel', []))
    seed_model(ImportantFactor, 'label', options.get('ImportantFactor', []))
    seed_model(InternetAccessMode, 'label', options.get('InternetAccessMode', []))
    seed_model(SocialPlatform, 'label', options.get('SocialPlatform', []))
    seed_model(Barrier, 'label', options.get('Barrier', []))
    seed_model(TrainingTopic, 'label', options.get('TrainingTopic', []))
    seed_model(Motivation, 'label', options.get('Motivation', []))
    seed_model(DeliveryType, 'label', options.get('DeliveryType', []))
    seed_model(TimeSlot, 'label', options.get('TimeSlot', []))
    seed_model(Frequency, 'label', options.get('Frequency', []))
    seed_model(CollectionArea, 'name', options.get('CollectionArea', []))

    # Default Survey
    Survey.objects.get_or_create(
        name="DNA-TECH Survey",
        slug="dna-tech-survey",
        description="Comprehensive survey data from DNA-TECH.csv"
    )

    print("Success: Database seeded with all options.")

if __name__ == "__main__":
    seed_data()

