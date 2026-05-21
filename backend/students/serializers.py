from rest_framework import serializers
from .models import Student
from users.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class StudentSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Student
        fields = ('id', 'user', 'user_details', 'roll_number', 'date_of_birth', 'address', 'guardian_name', 'created_at')
