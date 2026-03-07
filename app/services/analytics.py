from app import db
from app.model import (
    Participant, Gender, Subcities, EducationLevel, 
    Submissions, YneSources, InternetAccess, SocialMediaPlatforms, 
    TrainingsBarriers, TrainingTopics, MotivationFactors, TimeOptions, FrequencyOptions,
    DeliveryMethods
)
from sqlalchemy import func

class AnalyticsService:
    @staticmethod
    def get_overview_kpis(): #kpi stands for 'Key Performance Indicator' its those big numbers and stuff on a card
        total = db.session.query(func.count(Participant.participant_id)).scalar()
        heard_yes = db.session.query(func.count(Participant.participant_id))\
            .filter(Participant.heard_about_yne == True).scalar()
        
        return {
            "total_respondents": total,
            "awareness_rate": round((heard_yes / total * 100), 1) if total > 0 else 0,
            "status": "healthy"
        }

    @staticmethod
    def get_demographics():
        gender_data = db.session.query(
            Gender.name, func.count(Participant.participant_id)
        ).join(Participant).group_by(Gender.name).all()
        
        subcity_data = db.session.query(
            Subcities.name, func.count(Participant.participant_id)
        ).join(Participant).group_by(Subcities.name).all()

        edu_data = db.session.query(
            EducationLevel.name, func.count(Participant.participant_id)
        ).join(Participant).group_by(EducationLevel.name).all()
        
        return {
            "genders": {name: count for name, count in gender_data},
            "subcities": {name: count for name, count in subcity_data},
            "education": {name: count for name, count in edu_data}
        }

    @staticmethod
    def get_source_stats():
        sources = db.session.query(
            YneSources.name, func.count(Submissions.submission_id)
        ).join(Submissions.yne_sources).group_by(YneSources.name).all()
        return {
            "sources": {name: count for name, count in sources}
        }

    @staticmethod
    def get_participation_insights():
        barriers = db.session.query(
            TrainingsBarriers.name, func.count(Submissions.submission_id)
        ).join(Submissions.training_barrier).group_by(TrainingsBarriers.name).all()

        motivators = db.session.query(
            MotivationFactors.name, func.count(Submissions.submission_id)
        ).join(Submissions.motivators).group_by(MotivationFactors.name).all()
        return {
            "top_barriers": {name: count for name, count in barriers},
            "top_motivators": {name: count for name, count in motivators}
        }

    @staticmethod
    def get_training_preferences():
        topics = db.session.query(
            TrainingTopics.name, func.count(Submissions.submission_id)
        ).join(Submissions.topic_interests).group_by(TrainingTopics.name).all()

        time_prefs = db.session.query(
            TimeOptions.name, func.count(Submissions.submission_id)
        ).join(Submissions, Submissions.pref_time_id == TimeOptions.time_option_id)\
            .group_by(TimeOptions.name).all()

        freq_prefs = db.session.query(
            FrequencyOptions.name, func.count(Submissions.submission_id)
        ).join(Submissions, Submissions.pref_freq_id == FrequencyOptions.frequency_option_id)\
            .group_by(FrequencyOptions.name).all()

        return {
            "topics": {name: count for name, count in topics},
            "timing": {name: count for name, count in time_prefs},
            "frequency": {name: count for name, count in freq_prefs},
        }

    @staticmethod
    def get_delivery_stats():
        delivery = db.session.query(
            DeliveryMethods.name, func.count(Submissions.submission_id)
        ).join(Submissions.delivery_prefs).group_by(DeliveryMethods.name).all()
        
        return {
            "delivery_methods": {name: count for name, count in delivery}
        }