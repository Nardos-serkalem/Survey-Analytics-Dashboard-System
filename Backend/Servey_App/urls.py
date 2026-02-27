from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SubCityViewSet, EducationLevelViewSet, EmploymentStatusViewSet,
    CollectionAreaViewSet, TimeSlotViewSet, FrequencyViewSet,
    AwarenessChannelViewSet, ImportantFactorViewSet, InternetAccessModeViewSet,
    SocialPlatformViewSet, BarrierViewSet, TrainingTopicViewSet,
    MotivationViewSet, DeliveryTypeViewSet, ResponseViewSet, SurveyViewSet,
    health_check
)

router = DefaultRouter()
router.register(r'sub-cities', SubCityViewSet)
router.register(r'education-levels', EducationLevelViewSet)
router.register(r'employment-statuses', EmploymentStatusViewSet)
router.register(r'collection-areas', CollectionAreaViewSet)
router.register(r'time-slots', TimeSlotViewSet)
router.register(r'frequencies', FrequencyViewSet)
router.register(r'awareness-channels', AwarenessChannelViewSet)
router.register(r'important-factors', ImportantFactorViewSet)
router.register(r'internet-access-modes', InternetAccessModeViewSet)
router.register(r'social-platforms', SocialPlatformViewSet)
router.register(r'barriers', BarrierViewSet)
router.register(r'training-topics', TrainingTopicViewSet)
router.register(r'motivations', MotivationViewSet)
router.register(r'delivery-types', DeliveryTypeViewSet)
router.register(r'responses', ResponseViewSet)
router.register(r'surveys', SurveyViewSet)

app_name = "surveys"

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/health/', health_check, name='health_check'),
]


