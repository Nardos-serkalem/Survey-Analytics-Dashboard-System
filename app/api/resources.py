from flask_restful import Resource
from app import db
from app.model import Participant
from sqlalchemy import text
from app.api.decorators import admin_required
from app.services.analytics import AnalyticsService

class HealthCheck(Resource):
    def get(self):
        try:
            # Ping the database
            db.session.execute(text('SELECT 1'))
            return {
                'status': 'healthy',
                'database': 'connected',
                'message': 'Survey Analytics API is running'
            }
        except Exception as e:
            return {
                'status': 'unhealthy',
                'database': 'disconnected',
                'error': str(e)
            }, 503

class RespondentList(Resource):
    @admin_required
    def get(self):
        participants = db.session.query(Participant).limit(10).all()
        return {
            'count': len(participants),
            'respondents': [{'id': p.participant_id, 'age': p.age} for p in participants]
        }

class AnalyticsOverview(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_overview_kpis()

class AnalyticsDemographics(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_demographics()

class AnalyticsParticipation(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_participation_insights()

class AnalyticsPreferences(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_training_preferences()

class AnalyticsSources(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_source_stats()

class AnalyticsDelivery(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_delivery_stats()
