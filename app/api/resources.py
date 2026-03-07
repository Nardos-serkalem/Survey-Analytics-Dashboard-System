from flask_restful import Resource
from app.models import db, Respondent
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
        respondents = Respondent.query.limit(10).all()
        return {
            'count': len(respondents),
            'respondents': [{'id': r.respondent_id, 'age': r.age} for r in respondents]
        }

class AnalyticsOverview(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_overview_kpis()

class AnalyticsDemographics(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_demographics()

class AnalyticsEngagement(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_engagement_stats()

class AnalyticsParticipation(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_participation_insights()

class AnalyticsPreferences(Resource):
    @admin_required
    def get(self):
        return AnalyticsService.get_training_preferences()
