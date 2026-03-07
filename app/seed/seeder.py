import re
import pandas as pd
from app import db
from app.model import FrequencyOptions, LikertOptions, ConsentOptions, DeliveryMethods, EducationLevel, EmploymentStatus, Gender, InternetAccess, MotivationFactors, Participant, SocialMediaPlatforms, Subcities, Submissions, TimeOptions, TrainingTopics, TrainingsBarriers, YneSources

def seed_data():
    if db.session.query(Participant).count() > 0:
        print("✓ Database already seeded. Skipping...")
        return
    df = pd.read_excel('app/data/survey_data.xlsx', header=1)
    df.rename(columns={df.columns[1]: "Consent"}, inplace=True)
    #print(df.columns.tolist())

    for index, row in df.iterrows():
        gender = row['Gender']
        if pd.isna(gender) or str(gender).strip() == "":
            continue   
        genders = db.session.query(Gender).filter_by(name=gender).first()
        if not genders:
            genders = Gender(name=gender)
            db.session.add(genders)
        subcity = row['Sub City ']
        if pd.isna(subcity) or str(subcity).strip() == "":
            continue
        subcities = db.session.query(Subcities).filter_by(name=subcity).first()
        if not subcities:
            subcities = Subcities(name=row['Sub City '])
            db.session.add(subcities)
        education_level = row['Education Level ']
        if pd.isna(education_level) or str(education_level).strip() == "":
                continue
        education_levels = db.session.query(EducationLevel).filter_by(name=education_level).first()            
        if not education_levels:
            education_levels = EducationLevel(name=education_level)
            db.session.add(education_levels)
        employment_status = row['Employment Status']
        if pd.isna(employment_status) or str(employment_status).strip() == "":
            continue
        employments_status = db.session.query(EmploymentStatus).filter_by(name=employment_status).first()
        if not employments_status:
            employments_status = EmploymentStatus(name=employment_status, sort_order=0)
            db.session.add(employments_status)
        consent = row['Consent']
        if pd.isna(consent) or str(consent).strip() == "":
            continue
        consents = db.session.query(ConsentOptions).filter_by(name=consent).first()
        if not consents:
            consents = ConsentOptions(name=consent)
            db.session.add(consents)

        time_option = db.session.query(TimeOptions).filter_by(name=row['What is your preferred time for attending online training sessions?']).first()
        if not time_option:
            time_option = TimeOptions(name=row['What is your preferred time for attending online training sessions?'])
            db.session.add(time_option)
        frequency_option = db.session.query(FrequencyOptions).filter_by(name=row['What is your preferred time for attending online training sessions?']).first()
        if not  frequency_option:
            frequency_option = FrequencyOptions(name=row['What is your preferred time for attending online training sessions?'], sort_order=0)
            db.session.add( frequency_option)
        likelihood = db.session.query(LikertOptions).filter_by(
        name=row['How likely are you to join a free online training program offered by YNE?']
        ).first()
        if not likelihood:
            likelihood = LikertOptions(name=row['How likely are you to join a free online training program offered by YNE?'], score=0)
            db.session.add(likelihood)
        rating = db.session.query(LikertOptions).filter_by(
        name=row['How do you evaluate the overall questionnaire preparation?']
        ).first()
        if not rating:
            rating = LikertOptions(name=row['How do you evaluate the overall questionnaire preparation?'], score=0)
            db.session.add(rating)
        age = row['Age']
        if pd.isna(age) or age < 10 or age > 65:
            continue
        db.session.flush()
        participant = Participant(
            age=int(age),
            gender=genders,
            subcity=subcities,
            education_level=education_levels,
            employment=employments_status,
            has_telegram=1 if row['Do you have a Telegram account? '] == "Yes" else 0,
            heard_about_yne=1 if row['Have you ever heard about The Youth Network Ethiopia (YNE)?'] == "Yes" else 0
        )
        db.session.add(participant)
        db.session.flush()
        submission = Submissions(
            participant=participant,
            consent=consents,
            pref_time=time_option,
            pref_freq=frequency_option,
            likelihood=likelihood,
            questionnaire_rating=rating,

            wants_certification=1 if row['Would you be more likely to attend free training sessions if they offered certification?'] == "Yes" else 0,
            open_topics=row.get("What feedback and recommendations do you have for improving the questionnaire?"),
            collection_area_id=1
        )
        db.session.add(submission)
        db.session.flush()

        if pd.notna(row['If yes, how did you first learn about YNE? (Check all that apply)']):
            ynesources = re.split(r",\s*(?![^()]*\))", str(row['If yes, how did you first learn about YNE? (Check all that apply)']))
            for s in ynesources:
                s = s.strip()
                if not s: continue
                option = db.session.query(YneSources).filter_by(name=s).first()
                if not option:
                    option = YneSources(name=s)
                    db.session.add(option)
                    db.session.flush()
                submission.yne_sources.append(option)
        if pd.notna(row['What would be the most significant barriers for you to participate in free training sessions? (Select all that apply)']):
            training_barriers = re.split(r",\s*(?![^()]*\))", str(row['What would be the most significant barriers for you to participate in free training sessions? (Select all that apply)']))
            for b in training_barriers:
                b = b.strip()
                if not b: continue
                option = db.session.query(TrainingsBarriers).filter_by(name=b).first()
                if not option:
                    option = TrainingsBarriers(name=b)
                    db.session.add(option)
                    db.session.flush()
                submission.training_barrier.append(option)
        if pd.notna(row['How do you access the internet? (Select all that apply)']):
            internet_access = re.split(r",\s*(?![^()]*\))", str(row['How do you access the internet? (Select all that apply)']))
            for i in internet_access:
                i = i.strip()
                if not i: continue
                option = db.session.query(InternetAccess).filter_by(name=i).first()
                if not option:
                    option = InternetAccess(name=i)
                    db.session.add(option)
                    db.session.flush()
                submission.internet_access.append(option)
        if pd.notna(row['Which social media platforms have you used for online training purposes? (Select all that apply)']):
            social_media = re.split(r",\s*(?![^()]*\))", str(row['Which social media platforms have you used for online training purposes? (Select all that apply)']))
            for i in social_media:
                i = i.strip()
                if not i: continue
                option = db.session.query(SocialMediaPlatforms).filter_by(name=i).first()
                if not option:
                    option = SocialMediaPlatforms(name=i)
                    db.session.add(option)
                    db.session.flush()
                submission.social_media.append(option)
        if pd.notna(row['Would you be interested in training sessions on the following topics? (Select all that apply)']):
            training_topics = re.split(r",\s*(?![^()]*\))", str(row['Would you be interested in training sessions on the following topics? (Select all that apply)']))
            for i in training_topics:
                i = i.strip()
                if not i: continue
                option = db.session.query(TrainingTopics).filter_by(name=i).first()
                if not option:
                    option = TrainingTopics(name=i)
                    db.session.add(option)
                    db.session.flush()
                submission.topic_interests.append(option)
        if pd.notna(row['What motivates you to consider joining a free training program? (Select all that apply)']):
            motivation_factor = re.split(r",\s*(?![^()]*\))", str(row['What motivates you to consider joining a free training program? (Select all that apply)']))
            for i in motivation_factor:
                i = i.strip()
                if not i: continue
                option = db.session.query(MotivationFactors).filter_by(name=i).first()
                if not option:
                    option = MotivationFactors(name=i)
                    db.session.add(option)
                    db.session.flush()
                submission.motivators.append(option)
        if pd.notna(row['What type of training delivery do you prefer? (Select all that apply)']):
            delivery_method = re.split(r",\s*(?![^()]*\))", str(row['What type of training delivery do you prefer? (Select all that apply)']))
            for i in delivery_method:
                i = i.strip()
                if not i: continue
                option = db.session.query(DeliveryMethods).filter_by(name=i).first()
                if not option:
                    option = DeliveryMethods(name=i)
                    db.session.add(option)
                    db.session.flush()
                submission.delivery_prefs.append(option)
    db.session.commit()