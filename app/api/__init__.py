import os
from flask import Blueprint
from flask_restful import Api

api_bp = Blueprint('api', __name__)
api = Api(api_bp)

from app.api.auth import Login, Logout, AuthStatus
from app.api.resources import (
    HealthCheck, RespondentList, 
    AnalyticsOverview, AnalyticsDemographics, 
    AnalyticsEngagement, AnalyticsParticipation,
    AnalyticsPreferences
)

api.add_resource(HealthCheck, '/health')
api.add_resource(Login, '/auth/login')
api.add_resource(Logout, '/auth/logout')
api.add_resource(AuthStatus, '/auth/status')
api.add_resource(RespondentList, '/respondents')
api.add_resource(AnalyticsOverview, '/analytics/overview')
api.add_resource(AnalyticsDemographics, '/analytics/demographics')
api.add_resource(AnalyticsEngagement, '/analytics/engagement')
api.add_resource(AnalyticsParticipation, '/analytics/participation')
api.add_resource(AnalyticsPreferences, '/analytics/preferences')
