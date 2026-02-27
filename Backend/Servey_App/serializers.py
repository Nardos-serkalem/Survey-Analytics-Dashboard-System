from rest_framework import serializers
from .models import (
    SubCity, EducationLevel, EmploymentStatus, CollectionArea,
    TimeSlot, Frequency, AwarenessChannel, ImportantFactor,
    InternetAccessMode, SocialPlatform, Barrier, TrainingTopic,
    Motivation, DeliveryType, Response, Survey
)

class SubCitySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCity
        fields = '__all__'

class EducationLevelSerializer(serializers.ModelSerializer):
    class Meta:
        model = EducationLevel
        fields = '__all__'

class EmploymentStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmploymentStatus
        fields = '__all__'

class CollectionAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = CollectionArea
        fields = '__all__'

class TimeSlotSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeSlot
        fields = '__all__'

class FrequencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Frequency
        fields = '__all__'

class AwarenessChannelSerializer(serializers.ModelSerializer):
    class Meta:
        model = AwarenessChannel
        fields = '__all__'

class ImportantFactorSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImportantFactor
        fields = '__all__'

class InternetAccessModeSerializer(serializers.ModelSerializer):
    class Meta:
        model = InternetAccessMode
        fields = '__all__'

class SocialPlatformSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialPlatform
        fields = '__all__'

class BarrierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Barrier
        fields = '__all__'

class TrainingTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingTopic
        fields = '__all__'

class MotivationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Motivation
        fields = '__all__'

class DeliveryTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryType
        fields = '__all__'

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'

class SurveySerializer(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = '__all__'

