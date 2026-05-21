from rest_framework import serializers
from .models import Teacher
from users.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class TeacherSerializer(serializers.ModelSerializer):
    user_details = UserSerializer(source='user', read_only=True)
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Teacher
        fields = ('id', 'user', 'user_details', 'employee_id', 'department', 'qualification', 'created_at')
