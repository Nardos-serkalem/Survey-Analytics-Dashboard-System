"""
models.py
─────────
DNA Software Team — Survey System
DB & Schema Design Layer

Defines all SQLAlchemy ORM models exactly matching the 3NF schema:
  • 2 core tables      : Respondent, Submission
  • 9 lookup tables    : Gender, Subcity, EducationLevel, EmploymentStatus,
                         ConsentOption, LikertOption, TimeOption,
                         FrequencyOption, CollectionArea
  • 8 junction tables  : resp_program_sources, resp_training_factors,
                         resp_internet_access, resp_social_media,
                         resp_barriers, resp_topic_interests,
                         resp_motivators, resp_delivery_prefs
  • 8 option tables    : ProgramSource, TrainingFactor, InternetMethod,
                         SocialPlatform, ParticipationBarrier, TrainingTopic,
                         Motivator, DeliveryType
  • 1 audit table      : AuditLog
"""

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


# ══════════════════════════════════════════════════════════════════════════════
# AUTHENTICATION & USERS
# ══════════════════════════════════════════════════════════════════════════════

class User(db.Model):
    """
    Manages system users with role-based access control (RBAC).
    Possible roles: 'admin', 'editor', 'viewer'.
    """
    __tablename__ = 'users'

    user_id       = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username      = db.Column(db.String(50), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role          = db.Column(db.String(20), nullable=False, default='viewer')
    last_login    = db.Column(db.DateTime)
    created_at    = db.Column(db.DateTime, default=lambda: datetime.now(timezone.utc))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username} ({self.role})>'



# ══════════════════════════════════════════════════════════════════════════════
# LOOKUP TABLES
# ══════════════════════════════════════════════════════════════════════════════

class Gender(db.Model):
    __tablename__ = 'genders'

    gender_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(30), nullable=False, unique=True)

    # back-ref
    respondents = db.relationship('Respondent', back_populates='gender')

    def __repr__(self):
        return f'<Gender {self.label}>'


class Subcity(db.Model):
    __tablename__ = 'subcities'

    subcity_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    name       = db.Column(db.String(80), nullable=False, unique=True)

    respondents = db.relationship('Respondent', back_populates='subcity')

    def __repr__(self):
        return f'<Subcity {self.name}>'


class EducationLevel(db.Model):
    __tablename__ = 'education_levels'

    education_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    level        = db.Column(db.String(80), nullable=False, unique=True)
    sort_order   = db.Column(db.SmallInteger)

    respondents = db.relationship('Respondent', back_populates='education')

    def __repr__(self):
        return f'<EducationLevel {self.level}>'


class EmploymentStatus(db.Model):
    __tablename__ = 'employment_statuses'

    employment_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    status        = db.Column(db.String(80), nullable=False, unique=True)

    respondents = db.relationship('Respondent', back_populates='employment')

    def __repr__(self):
        return f'<EmploymentStatus {self.status}>'


class ConsentOption(db.Model):
    __tablename__ = 'consent_options'

    consent_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    label      = db.Column(db.String(60), nullable=False, unique=True)

    submissions = db.relationship('Submission', back_populates='consent')

    def __repr__(self):
        return f'<ConsentOption {self.label}>'


class LikertOption(db.Model):
    """Shared Likert scale — used by Q14 (likelihood) and Q23 (questionnaire rating)."""
    __tablename__ = 'likert_options'

    likert_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(60), nullable=False, unique=True)
    score     = db.Column(db.SmallInteger)   # numeric weight for analytics

    likelihood_submissions = db.relationship(
        'Submission',
        foreign_keys='Submission.likelihood_id',
        back_populates='likelihood',
    )
    rating_submissions = db.relationship(
        'Submission',
        foreign_keys='Submission.questionnaire_rating_id',
        back_populates='questionnaire_rating',
    )

    def __repr__(self):
        return f'<LikertOption {self.label} score={self.score}>'


class TimeOption(db.Model):
    __tablename__ = 'time_options'

    time_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    label   = db.Column(db.String(60), nullable=False, unique=True)

    submissions = db.relationship('Submission', back_populates='pref_time')

    def __repr__(self):
        return f'<TimeOption {self.label}>'


class FrequencyOption(db.Model):
    __tablename__ = 'frequency_options'

    freq_id    = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    label      = db.Column(db.String(60), nullable=False, unique=True)
    sort_order = db.Column(db.SmallInteger)

    submissions = db.relationship('Submission', back_populates='pref_frequency')

    def __repr__(self):
        return f'<FrequencyOption {self.label}>'


class CollectionArea(db.Model):
    __tablename__ = 'collection_areas'

    area_id = db.Column(db.SmallInteger, primary_key=True, autoincrement=True)
    name    = db.Column(db.String(80), nullable=False, unique=True)

    submissions = db.relationship('Submission', back_populates='collection_area')

    def __repr__(self):
        return f'<CollectionArea {self.name}>'


# ══════════════════════════════════════════════════════════════════════════════
# MULTI-SELECT OPTION TABLES
# ══════════════════════════════════════════════════════════════════════════════

class ProgramSource(db.Model):
    """Q10 — How did you first learn about the program?"""
    __tablename__ = 'program_sources'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<ProgramSource {self.label}>'


class TrainingFactor(db.Model):
    """Q11 — Which factors would be most important to you?"""
    __tablename__ = 'training_factors'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<TrainingFactor {self.label}>'


class InternetMethod(db.Model):
    """Q12 — How do you access the internet?"""
    __tablename__ = 'internet_methods'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<InternetMethod {self.label}>'


class SocialPlatform(db.Model):
    """Q13 — Which social media platforms have you used for online training?"""
    __tablename__ = 'social_platforms'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<SocialPlatform {self.label}>'


class ParticipationBarrier(db.Model):
    """Q15 — What would be the most significant barriers to participation?"""
    __tablename__ = 'participation_barriers'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<ParticipationBarrier {self.label}>'


class TrainingTopic(db.Model):
    """Q16 — Would you be interested in training on the following topics?"""
    __tablename__ = 'training_topics'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<TrainingTopic {self.label}>'


class Motivator(db.Model):
    """Q17 — What motivates you to consider joining a free training program?"""
    __tablename__ = 'motivators'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<Motivator {self.label}>'


class DeliveryType(db.Model):
    """Q18 — What type of training delivery do you prefer?"""
    __tablename__ = 'delivery_types'

    option_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    label     = db.Column(db.String(200), nullable=False, unique=True)

    def __repr__(self):
        return f'<DeliveryType {self.label}>'


# ══════════════════════════════════════════════════════════════════════════════
# JUNCTION TABLES  (multi-select many-to-many)
# ══════════════════════════════════════════════════════════════════════════════
# Each table has a composite PK (submission_id, option_id).
# ON DELETE CASCADE ensures junction rows are removed when a submission is deleted.

resp_program_sources = db.Table(
    'resp_program_sources',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('program_sources.option_id'),
        primary_key=True,
    ),
)

resp_training_factors = db.Table(
    'resp_training_factors',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('training_factors.option_id'),
        primary_key=True,
    ),
)

resp_internet_access = db.Table(
    'resp_internet_access',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('internet_methods.option_id'),
        primary_key=True,
    ),
)

resp_social_media = db.Table(
    'resp_social_media',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('social_platforms.option_id'),
        primary_key=True,
    ),
)

resp_barriers = db.Table(
    'resp_barriers',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('participation_barriers.option_id'),
        primary_key=True,
    ),
)

resp_topic_interests = db.Table(
    'resp_topic_interests',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('training_topics.option_id'),
        primary_key=True,
    ),
)

resp_motivators = db.Table(
    'resp_motivators',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('motivators.option_id'),
        primary_key=True,
    ),
)

resp_delivery_prefs = db.Table(
    'resp_delivery_prefs',
    db.Column(
        'submission_id', db.Integer,
        db.ForeignKey('submissions.submission_id', ondelete='CASCADE'),
        primary_key=True,
    ),
    db.Column(
        'option_id', db.Integer,
        db.ForeignKey('delivery_types.option_id'),
        primary_key=True,
    ),
)


# ══════════════════════════════════════════════════════════════════════════════
# CORE TABLES
# ══════════════════════════════════════════════════════════════════════════════

class Respondent(db.Model):
    """
    Stores the demographic profile of each survey participant.
    One respondent can have many submissions.
    """
    __tablename__ = 'respondents'
    __table_args__ = (
        db.CheckConstraint('age BETWEEN 10 AND 100', name='chk_age_range'),
    )

    respondent_id    = db.Column(db.Integer,      primary_key=True, autoincrement=True)
    age              = db.Column(db.SmallInteger,  nullable=False)
    gender_id        = db.Column(db.SmallInteger,  db.ForeignKey('genders.gender_id'))
    subcity_id       = db.Column(db.SmallInteger,  db.ForeignKey('subcities.subcity_id'))
    education_id     = db.Column(db.SmallInteger,  db.ForeignKey('education_levels.education_id'))
    employment_id    = db.Column(db.SmallInteger,  db.ForeignKey('employment_statuses.employment_id'))
    has_telegram     = db.Column(db.Boolean,       default=None)
    heard_of_program = db.Column(db.Boolean,       default=None)

    # Relationships
    gender      = db.relationship('Gender',           back_populates='respondents')
    subcity     = db.relationship('Subcity',          back_populates='respondents')
    education   = db.relationship('EducationLevel',   back_populates='respondents')
    employment  = db.relationship('EmploymentStatus', back_populates='respondents')
    submissions = db.relationship(
        'Submission',
        back_populates='respondent',
        cascade='all, delete-orphan',
    )

    def __repr__(self):
        return f'<Respondent id={self.respondent_id} age={self.age}>'


class Submission(db.Model):
    """
    Central hub table — one row per completed survey form.
    Links a respondent to all their answers (single-choice via FKs,
    multi-select via junction tables).
    """
    __tablename__ = 'submissions'

    submission_id           = db.Column(db.Integer,      primary_key=True, autoincrement=True)
    respondent_id           = db.Column(db.Integer,      db.ForeignKey('respondents.respondent_id'), nullable=False)
    submitted_at            = db.Column(db.DateTime,     nullable=False, default=lambda: datetime.now(timezone.utc))
    consent_id              = db.Column(db.SmallInteger, db.ForeignKey('consent_options.consent_id'), nullable=False)
    likelihood_id           = db.Column(db.SmallInteger, db.ForeignKey('likert_options.likert_id'))           # Q14
    pref_time_id            = db.Column(db.SmallInteger, db.ForeignKey('time_options.time_id'))               # Q19
    pref_frequency_id       = db.Column(db.SmallInteger, db.ForeignKey('frequency_options.freq_id'))          # Q20
    wants_certification     = db.Column(db.Boolean)                                                           # Q21
    open_topics             = db.Column(db.Text)                                                              # Q22 free-text
    questionnaire_rating_id = db.Column(db.SmallInteger, db.ForeignKey('likert_options.likert_id'))           # Q23
    open_feedback           = db.Column(db.Text)                                                              # Q24 free-text
    collection_area_id      = db.Column(db.SmallInteger, db.ForeignKey('collection_areas.area_id'))           # Q25

    # Single-choice relationships
    respondent         = db.relationship('Respondent',      back_populates='submissions')
    consent            = db.relationship('ConsentOption',   back_populates='submissions')
    likelihood         = db.relationship('LikertOption',    foreign_keys=[likelihood_id],           back_populates='likelihood_submissions')
    questionnaire_rating = db.relationship('LikertOption',  foreign_keys=[questionnaire_rating_id], back_populates='rating_submissions')
    pref_time          = db.relationship('TimeOption',      back_populates='submissions')
    pref_frequency     = db.relationship('FrequencyOption', back_populates='submissions')
    collection_area    = db.relationship('CollectionArea',  back_populates='submissions')

    # Multi-select relationships (via junction tables)
    program_sources  = db.relationship('ProgramSource',        secondary=resp_program_sources,  backref='submissions')
    training_factors = db.relationship('TrainingFactor',       secondary=resp_training_factors, backref='submissions')
    internet_access  = db.relationship('InternetMethod',       secondary=resp_internet_access,  backref='submissions')
    social_media     = db.relationship('SocialPlatform',       secondary=resp_social_media,     backref='submissions')
    barriers         = db.relationship('ParticipationBarrier', secondary=resp_barriers,         backref='submissions')
    topic_interests  = db.relationship('TrainingTopic',        secondary=resp_topic_interests,  backref='submissions')
    motivators       = db.relationship('Motivator',            secondary=resp_motivators,       backref='submissions')
    delivery_prefs   = db.relationship('DeliveryType',         secondary=resp_delivery_prefs,   backref='submissions')

    def __repr__(self):
        return f'<Submission id={self.submission_id} respondent={self.respondent_id}>'


# ══════════════════════════════════════════════════════════════════════════════
# AUDIT LOG
# ══════════════════════════════════════════════════════════════════════════════

class AuditLog(db.Model):
    """
    Records every INSERT, UPDATE, and DELETE across all tables.
    old_values and new_values are stored as JSON snapshots.
    """
    __tablename__ = 'audit_log'
    __table_args__ = (
        db.CheckConstraint("operation IN ('INSERT','UPDATE','DELETE')", name='chk_operation'),
    )

    log_id     = db.Column(db.Integer,   primary_key=True, autoincrement=True)
    table_name = db.Column(db.String(60), nullable=False)
    operation  = db.Column(db.String(10), nullable=False)
    record_id  = db.Column(db.Integer)
    changed_at = db.Column(db.DateTime,  nullable=False, default=lambda: datetime.now(timezone.utc))
    old_values = db.Column(db.JSON)
    new_values = db.Column(db.JSON)

    def __repr__(self):
        return f'<AuditLog {self.operation} on {self.table_name} id={self.record_id}>'


# ══════════════════════════════════════════════════════════════════════════════
# PERFORMANCE INDEXES
# ══════════════════════════════════════════════════════════════════════════════

db.Index('idx_submissions_respondent', Submission.respondent_id)
db.Index('idx_submissions_submitted',  Submission.submitted_at)
db.Index('idx_respondents_subcity',    Respondent.subcity_id)
db.Index('idx_respondents_age',        Respondent.age)
