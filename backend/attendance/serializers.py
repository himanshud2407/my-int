from rest_framework import serializers
from .models import Attendance, FaceEmbedding

class AttendanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Attendance
        fields = '__all__'

class FaceEmbeddingSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaceEmbedding
        fields = '__all__'
