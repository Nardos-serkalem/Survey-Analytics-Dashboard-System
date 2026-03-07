from sqlalchemy import JSON, CheckConstraint, Column, DateTime, ForeignKey, Integer, String, Table
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from datetime import datetime, UTC

class Base(DeclarativeBase):
    pass
class Gender(Base):
    __tablename__ = 'genders'
    gender_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    participants = relationship('Participant', back_populates='gender')
class Subcities(Base):
    __tablename__ = 'subcities'
    subcities_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    participants = relationship('Participant', back_populates='subcity')
class EducationLevel(Base):
    __tablename__ = 'education_levels'
    education_level_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    participants = relationship('Participant', back_populates='education_level')
class EmploymentStatus(Base):
    __tablename__ = 'employment_statuses'
    employment_status_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    participants = relationship('Participant', back_populates='employment')
class ConsentOptions(Base):
    __tablename__ = 'consent_options'
    consent_option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    submissions = relationship('Submissions', back_populates='consent')
class LikertOptions(Base):
    __tablename__ = 'likert_options'
    likert_option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    score: Mapped[int] = mapped_column(Integer)
    likelihood_submissions = relationship('Submissions', foreign_keys='Submissions.likelihood_id', back_populates='likelihood')
    rating_submissions = relationship('Submissions', foreign_keys='Submissions.questionnaire_rating_id', back_populates='questionnaire_rating'
    )
class TimeOptions(Base):
    __tablename__ = 'time_options'
    time_option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    submissions = relationship('Submissions', back_populates='pref_time')
class FrequencyOptions(Base):
    __tablename__ = 'frequency_options'
    frequency_option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    submissions = relationship('Submissions', back_populates='pref_freq')
class CollectionAreas(Base):
    __tablename__ = 'collection_areas'
    collection_area_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(50))
    submissions = relationship('Submissions', back_populates='collection_area')



class YneSources(Base):
    __tablename__ = 'yne_sources'
    option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), unique=True)
class TrainingsBarriers(Base):
    __tablename__ = 'training_barriers'
    option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), unique=True)
class InternetAccess(Base):
    __tablename__ = 'internet_access'
    option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), unique=True)
class SocialMediaPlatforms(Base):
    __tablename__ = 'social_media_platforms'
    option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), unique=True)

class TrainingTopics(Base):
    __tablename__ = 'training_topics'
    option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), unique=True)
class MotivationFactors(Base):
    __tablename__ = 'motivation_factors'
    option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), unique=True)
class DeliveryMethods(Base):
    __tablename__ = 'delivery_methods'
    option_id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(200), unique=True)

ResponseYneSource = Table('response_yne_source',
    Base.metadata,
    Column('submission_id', ForeignKey('submissions.submission_id'), primary_key=True),
    Column('option_id', ForeignKey('yne_sources.option_id'), primary_key=True)
)
ResponseTrainingBarriers = Table('response_training_barriers',
    Base.metadata,
    Column('submission_id', ForeignKey('submissions.submission_id'), primary_key=True),
    Column('option_id', ForeignKey('training_barriers.option_id'), primary_key=True)
)
ResponseInternetAccess = Table('response_internet_access',
    Base.metadata,
    Column('submission_id', ForeignKey('submissions.submission_id'), primary_key=True),
    Column('option_id', ForeignKey('internet_access.option_id'), primary_key=True)
)
ResponseSocialMediaPlatforms = Table('response_social_media_platforms',
    Base.metadata,
    Column('submission_id', ForeignKey('submissions.submission_id'), primary_key=True),
    Column('option_id', ForeignKey('social_media_platforms.option_id'), primary_key=True)
)

ResponseMotivationFactors = Table('response_motivation_factors',
    Base.metadata,
    Column('submission_id', ForeignKey('submissions.submission_id'), primary_key=True),
    Column('option_id', ForeignKey('motivation_factors.option_id'), primary_key=True)
)
ResponseDeliveryMethods = Table('response_delivery_methods',
    Base.metadata,
    Column('submission_id', ForeignKey('submissions.submission_id'), primary_key=True),
    Column('option_id', ForeignKey('delivery_methods.option_id'), primary_key=True)
)
ResponseTrainingTopics = Table('response_training_topics',
    Base.metadata,
    Column('submission_id', ForeignKey('submissions.submission_id'), primary_key=True),
    Column('option_id', ForeignKey('training_topics.option_id'), primary_key=True)
)

class Participant(Base):
    __tablename__ = 'participants'
    participant_id: Mapped[int] = mapped_column(primary_key=True)
    age: Mapped[int] = mapped_column(Integer, nullable=True)
    gender_id: Mapped[int] = mapped_column(ForeignKey('genders.gender_id'))
    subcity_id: Mapped[int] = mapped_column(ForeignKey('subcities.subcities_id'))
    education_level_id: Mapped[int] = mapped_column(ForeignKey('education_levels.education_level_id'))
    employment_status_id: Mapped[int] = mapped_column(ForeignKey('employment_statuses.employment_status_id'))
    has_telegram: Mapped[bool] = mapped_column(Integer, default=0)
    heard_about_yne: Mapped[bool] = mapped_column(Integer, default=0)
    gender = relationship('Gender', back_populates='participants')
    subcity = relationship('Subcities', back_populates='participants')
    education_level = relationship('EducationLevel', back_populates='participants')
    employment = relationship('EmploymentStatus', back_populates='participants')
    submissions = relationship('Submissions', back_populates='participant', cascade='all, delete-orphan')


class Submissions(Base):
    __tablename__ = 'submissions'
    submission_id: Mapped[int] = mapped_column(primary_key=True)
    participant_id: Mapped[int] = mapped_column(ForeignKey('participants.participant_id'))
    consent_id: Mapped[int] = mapped_column(ForeignKey('consent_options.consent_option_id'))
    likelihood_id: Mapped[int] = mapped_column(ForeignKey('likert_options.likert_option_id'))
    pref_time_id: Mapped[int] = mapped_column(ForeignKey('time_options.time_option_id'))
    pref_freq_id: Mapped[int] = mapped_column(ForeignKey('frequency_options.frequency_option_id'))
    questionnaire_rating_id: Mapped[int] = mapped_column(ForeignKey('likert_options.likert_option_id'))
    wants_certification: Mapped[bool] = mapped_column(Integer, default=0)
    open_topics: Mapped[str] = mapped_column(String(500), nullable=True)
    collection_area_id: Mapped[int] = mapped_column(ForeignKey('collection_areas.collection_area_id'))

    participant = relationship('Participant', back_populates='submissions')
    consent = relationship('ConsentOptions', back_populates='submissions')
    likelihood = relationship('LikertOptions', foreign_keys=[likelihood_id], back_populates='likelihood_submissions')
    questionnaire_rating = relationship('LikertOptions', foreign_keys=[questionnaire_rating_id], back_populates='rating_submissions')
    pref_time = relationship('TimeOptions', back_populates='submissions')
    pref_freq = relationship('FrequencyOptions', back_populates='submissions')
    collection_area = relationship('CollectionAreas', back_populates='submissions')

    yne_sources = relationship('YneSources', secondary=ResponseYneSource)
    training_barrier = relationship('TrainingsBarriers', secondary=ResponseTrainingBarriers)
    internet_access = relationship('InternetAccess', secondary=ResponseInternetAccess)
    social_media = relationship('SocialMediaPlatforms', secondary=ResponseSocialMediaPlatforms)
    topic_interests = relationship('TrainingTopics', secondary=ResponseTrainingTopics)
    motivators = relationship('MotivationFactors', secondary=ResponseMotivationFactors)
    delivery_prefs = relationship('DeliveryMethods', secondary=ResponseDeliveryMethods)
class Audit_Log(Base):
    __tablename__ = 'audit_log'
    log_id: Mapped[int] = mapped_column(primary_key=True)
    table_name: Mapped[str] = mapped_column(String(50))
    operation: Mapped[str] = mapped_column(String(50))
    record_id: Mapped[int] = mapped_column(Integer)
    changed_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), default=datetime.now(UTC))
    old_values: Mapped[dict] = mapped_column(JSON)
    new_values: Mapped[dict] = mapped_column(JSON)
    __table_args__ = (CheckConstraint("operation IN ('INSERT','UPDATE','DELETE')", name='operation_check'),)