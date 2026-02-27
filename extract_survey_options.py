import csv
import json
from collections import defaultdict

csv_path = r'c:\Users\hp\OneDrive\Desktop\Survey\DNA-TECH.csv'
output_path = r'c:\Users\hp\OneDrive\Desktop\Survey\survey_options.json'

def extract_options():
    with open(csv_path, mode='r', encoding='utf-8-sig') as f:
        reader = csv.reader(f)
        # Skip garbage headers
        next(reader) # q
        next(reader) # Timestamp, Participation...
        next(reader) # We kindly invite...
        next(reader) # Before we proceed...
        header = next(reader)
        
        # Mapping indices to names from models.py
        mappings = {
            4: "SubCity",
            5: "EducationLevel",
            6: "EmploymentStatus",
            9: "AwarenessChannel",
            10: "ImportantFactor",
            11: "InternetAccessMode",
            12: "SocialPlatform",
            14: "Barrier",
            15: "TrainingTopic",
            16: "Motivation",
            17: "DeliveryType",
            18: "TimeSlot",
            19: "Frequency",
            24: "CollectionArea"
        }
        
        options = defaultdict(set)
        
        for row in reader:
            if not row: continue
            for idx, model in mappings.items():
                if idx < len(row):
                    val = row[idx].strip()
                    if val:
                        # Split by comma for multi-select
                        if idx in [9, 10, 11, 12, 14, 15, 16, 17]:
                            # Some options contain commas in parentheses, but csv.reader handles that if quoted.
                            # However, sometimes they are just comma separated inside the cell.
                            parts = [p.strip() for p in val.split(',')]
                            for p in parts:
                                if p:
                                    options[model].add(p)
                        else:
                            options[model].add(val)
        
        # Format for seed_db.py
        result = {}
        for model, values in options.items():
            result[model] = sorted(list(values))
            
        with open(output_path, 'w', encoding='utf-8') as out:
            json.dump(result, out, indent=4)
        print(f"Extraction complete. Results saved to {output_path}")

if __name__ == "__main__":
    extract_options()
