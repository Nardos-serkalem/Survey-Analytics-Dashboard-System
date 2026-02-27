from rest_framework import viewsets
from .models import (
    SubCity, EducationLevel, EmploymentStatus, CollectionArea,
    TimeSlot, Frequency, AwarenessChannel, ImportantFactor,
    InternetAccessMode, SocialPlatform, Barrier, TrainingTopic,
    Motivation, DeliveryType, Response, Survey
)
from .serializers import (
    SubCitySerializer, EducationLevelSerializer, EmploymentStatusSerializer,
    CollectionAreaSerializer, TimeSlotSerializer, FrequencySerializer,
    AwarenessChannelSerializer, ImportantFactorSerializer, InternetAccessModeSerializer,
    SocialPlatformSerializer, BarrierSerializer, TrainingTopicSerializer,
    MotivationSerializer, DeliveryTypeSerializer, ResponseSerializer, SurveySerializer
)

from rest_framework.decorators import api_view
from rest_framework.response import Response as DRFResponse
from django.db import connection

@api_view(['GET'])
def health_check(request):
    try:
        connection.ensure_connection()
        return DRFResponse({"status": "OPERATIONAL", "database": "CONNECTED"})
    except Exception as e:
        return DRFResponse({"status": "DEGRADED", "error": str(e)}, status=500)

class SubCityViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubCity.objects.all()
    serializer_class = SubCitySerializer

class EducationLevelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EducationLevel.objects.all()
    serializer_class = EducationLevelSerializer

class EmploymentStatusViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EmploymentStatus.objects.all()
    serializer_class = EmploymentStatusSerializer

class CollectionAreaViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CollectionArea.objects.all()
    serializer_class = CollectionAreaSerializer

class TimeSlotViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TimeSlot.objects.all()
    serializer_class = TimeSlotSerializer

class FrequencyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Frequency.objects.all()
    serializer_class = FrequencySerializer

class AwarenessChannelViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AwarenessChannel.objects.all()
    serializer_class = AwarenessChannelSerializer

class ImportantFactorViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ImportantFactor.objects.all()
    serializer_class = ImportantFactorSerializer

class InternetAccessModeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = InternetAccessMode.objects.all()
    serializer_class = InternetAccessModeSerializer

class SocialPlatformViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SocialPlatform.objects.all()
    serializer_class = SocialPlatformSerializer

class BarrierViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Barrier.objects.all()
    serializer_class = BarrierSerializer

class TrainingTopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = TrainingTopic.objects.all()
    serializer_class = TrainingTopicSerializer

class MotivationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Motivation.objects.all()
    serializer_class = MotivationSerializer

class DeliveryTypeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = DeliveryType.objects.all()
    serializer_class = DeliveryTypeSerializer

class ResponseViewSet(viewsets.ModelViewSet):
    queryset = Response.objects.all()
    serializer_class = ResponseSerializer

    def get_queryset(self):
        queryset = Response.objects.all()
        survey_slug = self.request.query_params.get('survey')
        if survey_slug:
            queryset = queryset.filter(survey__slug=survey_slug)
        return queryset

class SurveyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Survey.objects.all()
    serializer_class = SurveySerializer
