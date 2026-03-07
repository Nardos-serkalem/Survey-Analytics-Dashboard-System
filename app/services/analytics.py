from app.models import (
    db, Respondent, Gender, Subcity, EducationLevel, 
    Submission, ProgramSource, InternetMethod, SocialPlatform, 
    ParticipationBarrier, TrainingTopic, Motivator, TimeOption, FrequencyOption
)
from sqlalchemy import func

class AnalyticsService:
    @staticmethod
    def get_overview_kpis(): #kpi stands for 'Key Performance Indicator' its those big numbers and stuff on a card
        total = db.session.query(func.count(Respondent.respondent_id)).scalar()
        heard_yes = db.session.query(func.count(Respondent.respondent_id))\
            .filter(Respondent.heard_of_program == True).scalar()
        
        return {
            "total_respondents": total,
            "awareness_rate": round((heard_yes / total * 100), 1) if total > 0 else 0,
            "status": "healthy"
        }

    @staticmethod
    def get_demographics():
        gender_data = db.session.query(
            Gender.label, func.count(Respondent.respondent_id)
        ).join(Respondent).group_by(Gender.label).all()
        
        subcity_data = db.session.query(
            Subcity.name, func.count(Respondent.respondent_id)
        ).join(Respondent).group_by(Subcity.name).all()

        edu_data = db.session.query(
            EducationLevel.level, func.count(Respondent.respondent_id)
        ).join(Respondent).group_by(EducationLevel.level).all()
        
        return {
            "genders": {label: count for label, count in gender_data},
            "subcities": {name: count for name, count in subcity_data},
            "education": {level: count for level, count in edu_data}
        }

    @staticmethod
    def get_engagement_stats():
        sources = db.session.query(
            ProgramSource.label, func.count(Submission.submission_id)
        ).join(Submission.program_sources).group_by(ProgramSource.label).all()

        platforms = db.session.query(
            SocialPlatform.label, func.count(Submission.submission_id)
        ).join(Submission.social_platforms).group_by(SocialPlatform.label).all()

        return {
            "sources": {label: count for label, count in sources},
            "platforms": {label: count for label, count in platforms}
        }

    @staticmethod
    def get_participation_insights():
        barriers = db.session.query(
            ParticipationBarrier.label, func.count(Submission.submission_id)
        ).join(Submission.barriers).group_by(ParticipationBarrier.label).all()

        motivators = db.session.query(
            Motivator.label, func.count(Submission.submission_id)
        ).join(Submission.motivators).group_by(Motivator.label).all()

        return {
            "top_barriers": {label: count for label, count in barriers},
            "top_motivators": {label: count for label, count in motivators}
        }

    @staticmethod
    def get_training_preferences():
        topics = db.session.query(
            TrainingTopic.label, func.count(Submission.submission_id)
        ).join(Submission.topic_interests).group_by(TrainingTopic.label).all()

        time_prefs = db.session.query(
            TimeOption.label, func.count(Submission.submission_id)
        ).join(Submission, Submission.pref_time_id == TimeOption.time_id)\
            .group_by(TimeOption.label).all()

        freq_prefs = db.session.query(
            FrequencyOption.label, func.count(Submission.submission_id)
        ).join(Submission, Submission.pref_frequency_id == FrequencyOption.freq_id)\
            .group_by(FrequencyOption.label).all()

        cert_data = db.session.query(
            Submission.wants_certification, func.count(Submission.submission_id)
        ).group_by(Submission.wants_certification).all()

        return {
            "topics": {label: count for label, count in topics},
            "timing": {label: count for label, count in time_prefs},
            "frequency": {label: count for label, count in freq_prefs},
            "certification": {str(val): count for val, count in cert_data}
        }
    