from marshmallow import Schema, fields, validate

class BaseValidation:
    @staticmethod
    def validate_input(data, schema_class):
        schema = schema_class()
        errors = schema.validate(data)
        if errors:
            return False, errors
        return True, None

class RespondentSchema(Schema):
    age = fields.Int(required=True, validate=validate.Range(min=10, max=100))
    gender_id = fields.Int(required=True)
    subcity_id = fields.Int(required=True)
