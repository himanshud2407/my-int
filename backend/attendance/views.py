from rest_framework import viewsets, permissions
from .models import Attendance, FaceEmbedding
from .serializers import AttendanceSerializer, FaceEmbeddingSerializer
from users.permissions import IsTeacher, IsSuperAdmin

class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsTeacher | IsSuperAdmin]

class FaceEmbeddingViewSet(viewsets.ModelViewSet):
    queryset = FaceEmbedding.objects.all()
    serializer_class = FaceEmbeddingSerializer
    permission_classes = [IsTeacher | IsSuperAdmin]

    def get_queryset(self):
        queryset = FaceEmbedding.objects.all()
        student_id = self.request.query_params.get('student', None)
        if student_id is not None:
            queryset = queryset.filter(student_id=student_id)
        return queryset
