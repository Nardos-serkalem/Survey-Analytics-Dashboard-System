#from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Survey(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    admins = models.ManyToManyField(
        User,
        related_name="admin_surveys",
        blank=True,
        help_text="Users who can administrate this survey.",
    )

    def __str__(self) -> str:
        return self.name


class SubCity(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.name


class EducationLevel(models.Model):
    name = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.name


class EmploymentStatus(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.name


class CollectionArea(models.Model):
    name = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.name


class TimeSlot(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.label


class Frequency(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.label


class AwarenessChannel(models.Model):
    label = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.label


class ImportantFactor(models.Model):
    label = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.label


class InternetAccessMode(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.label


class SocialPlatform(models.Model):
    label = models.CharField(max_length=100, unique=True)

    def __str__(self) -> str:
        return self.label


class Barrier(models.Model):
    label = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.label


class TrainingTopic(models.Model):
    label = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.label


class Motivation(models.Model):
    label = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.label


class DeliveryType(models.Model):
    label = models.CharField(max_length=150, unique=True)

    def __str__(self) -> str:
        return self.label


class Response(models.Model):
    survey = models.ForeignKey(
        Survey,
        on_delete=models.CASCADE,
        related_name="responses",
    )
    timestamp = models.DateTimeField()
    consent = models.CharField(max_length=255)
    age = models.PositiveIntegerField()
    gender = models.CharField(max_length=50)

    sub_city = models.ForeignKey(
        SubCity,
        on_delete=models.SET_NULL,
        related_name="responses",
        null=True,
        blank=True,
    )
    education_level = models.ForeignKey(
        EducationLevel,
        on_delete=models.SET_NULL,
        related_name="responses",
        null=True,
        blank=True,
    )
    employment_status = models.ForeignKey(
        EmploymentStatus,
        on_delete=models.SET_NULL,
        related_name="responses",
        null=True,
        blank=True,
    )

    has_telegram = models.BooleanField(null=True, blank=True)
    heard_of_yne = models.BooleanField(null=True, blank=True)

    likelihood_join_score = models.PositiveSmallIntegerField()
    certification_importance_score = models.PositiveSmallIntegerField()

    desired_topics_text = models.TextField(blank=True)
    questionnaire_rating = models.PositiveSmallIntegerField()
    questionnaire_feedback = models.TextField(blank=True)

    collection_area = models.ForeignKey(
        CollectionArea,
        on_delete=models.SET_NULL,
        related_name="responses",
        null=True,
        blank=True,
    )
    preferred_time_slot = models.ForeignKey(
        TimeSlot,
        on_delete=models.SET_NULL,
        related_name="responses",
        null=True,
        blank=True,
    )
    preferred_frequency = models.ForeignKey(
        Frequency,
        on_delete=models.SET_NULL,
        related_name="responses",
        null=True,
        blank=True,
    )

    awareness_channels = models.ManyToManyField(
        AwarenessChannel,
        related_name="responses",
        blank=True,
    )
    important_factors = models.ManyToManyField(
        ImportantFactor,
        related_name="responses",
        blank=True,
    )
    internet_access_modes = models.ManyToManyField(
        InternetAccessMode,
        related_name="responses",
        blank=True,
    )
    social_platforms = models.ManyToManyField(
        SocialPlatform,
        related_name="responses",
        blank=True,
    )
    barriers = models.ManyToManyField(
        Barrier,
        related_name="responses",
        blank=True,
    )
    training_topics = models.ManyToManyField(
        TrainingTopic,
        related_name="responses",
        blank=True,
    )
    motivations = models.ManyToManyField(
        Motivation,
        related_name="responses",
        blank=True,
    )
    delivery_types = models.ManyToManyField(
        DeliveryType,
        related_name="responses",
        blank=True,
    )

    def __str__(self) -> str:
        return f"Response #{self.pk} to {self.survey}"

