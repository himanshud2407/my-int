from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'role', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'role': {'read_only': True} # Prevent role assignment during registration
        }

    def create(self, validated_data):
        # Default role is student as defined in models
        user = User.objects.create_user(**validated_data)
        return user
