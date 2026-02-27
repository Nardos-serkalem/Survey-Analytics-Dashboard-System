import os
import django
import csv
from datetime import datetime

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from Servey_App.models import (
    SubCity, EducationLevel, EmploymentStatus, CollectionArea,
    TimeSlot, Frequency, AwarenessChannel, ImportantFactor,
    InternetAccessMode, SocialPlatform, Barrier, TrainingTopic,
    Motivation, DeliveryType, Response, Survey
)

def get_or_none(model, val):
    if not val or str(val).strip().lower() in ['nan', '', 'none']:
        return None
    val = val.strip()
    
    # Check if we should use 'name' or 'label'
    field_name = 'name' if hasattr(model, 'name') else 'label'
    
    try:
        # Try exact match first
        return model.objects.get(**{field_name: val})
    except model.DoesNotExist:
        # Try case-insensitive match
        try:
            return model.objects.get(**{f"{field_name}__iexact": val})
        except model.DoesNotExist:
            print(f"Warning: {model.__name__} '{val}' not found.")
            return None

def import_csv(file_path):
    # Ensure a Survey object exists
    survey, _ = Survey.objects.get_or_create(
        name="Youth Network Ethiopia Training Survey",
        defaults={"slug": "yne-training-survey", "description": "DNA-TECH Survey Data"}
    )

    with open(file_path, mode='r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        headers = next(reader)
        # Handle the "q,,,,," line if it exists
        if headers[0].lower() == 'q':
            headers = next(reader)
            
        count = 0
        for row in reader:
            if not row or len(row) < 20: continue
            
            try:
                # Column 0: Timestamp (e.g., 1/16/2025 10:22:19)
                ts_str = row[0]
                try:
                    timestamp = datetime.strptime(ts_str, '%m/%d/%Y %H:%M:%S')
                except ValueError:
                    timestamp = datetime.now()

                # Create basic response object
                res = Response(
                    survey=survey,
                    timestamp=timestamp,
                    consent=row[1],
                    age=int(row[2]) if row[2].isdigit() else 0,
                    gender=row[3],
                    sub_city=get_or_none(SubCity, row[4]),
                    education_level=get_or_none(EducationLevel, row[5]),
                    employment_status=get_or_none(EmploymentStatus, row[6]),
                    has_telegram=row[7].strip().lower() == 'yes',
                    heard_of_yne=row[8].strip().lower() == 'yes',
                    likelihood_join_score=int(row[13]) if row[13].isdigit() else 0,
                    preferred_time_slot=get_or_none(TimeSlot, row[18]),
                    preferred_frequency=get_or_none(Frequency, row[19]),
                    certification_importance_score=int(row[20]) if row[20].isdigit() else 0,
                    desired_topics_text=row[21],
                    questionnaire_rating=int(row[22]) if row[22].isdigit() else 0,
                    questionnaire_feedback=row[23],
                    collection_area=get_or_none(CollectionArea, row[24])
                )
                res.save()

                # Handle Many-to-Many fields
                # Awareness Channels (index 9)
                channels = [c.strip() for c in row[9].split(',')]
                for c in channels:
                    obj = get_or_none(AwarenessChannel, c)
                    if obj: res.awareness_channels.add(obj)

                # Important Factors (index 10)
                factors = [f.strip() for f in row[10].split(',')]
                for f in factors:
                    obj = get_or_none(ImportantFactor, f)
                    if obj: res.important_factors.add(obj)

                # Internet Access (index 11)
                modes = [m.strip() for m in row[11].split(',')]
                for m in modes:
                    obj = get_or_none(InternetAccessMode, m)
                    if obj: res.internet_access_modes.add(obj)

                # Social Platforms (index 12)
                plats = [p.strip() for p in row[12].split(',')]
                for p in plats:
                    obj = get_or_none(SocialPlatform, p)
                    if obj: res.social_platforms.add(obj)

                # Barriers (index 14)
                bars = [b.strip() for b in row[14].split(',')]
                for b in bars:
                    obj = get_or_none(Barrier, b)
                    if obj: res.barriers.add(obj)

                # Training Topics (index 15)
                tops = [t.strip() for t in row[15].split(',')]
                for t in tops:
                    obj = get_or_none(TrainingTopic, t)
                    if obj: res.training_topics.add(obj)

                # Motivations (index 16)
                mots = [m.strip() for m in row[16].split(',')]
                for m in mots:
                    obj = get_or_none(Motivation, m)
                    if obj: res.motivations.add(obj)

                # Delivery Types (index 17)
                delivs = [d.strip() for d in row[17].split(',')]
                for d in delivs:
                    obj = get_or_none(DeliveryType, d)
                    if obj: res.delivery_types.add(obj)

                count += 1
                if count % 50 == 0:
                    print(f"Imported {count} responses...")

            except Exception as e:
                print(f"Error importing row: {e}")
                continue

    print(f"Successfully imported {count} responses.")

if __name__ == "__main__":
    CSV_PATH = os.path.join('..', 'DNA-TECH.csv')
    import_csv(CSV_PATH)
