from rest_framework import viewsets
from .models import Exam, Result
from .serializers import ExamSerializer, ResultSerializer
from users.permissions import IsTeacher, IsSuperAdmin

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = [IsTeacher | IsSuperAdmin]

class ResultViewSet(viewsets.ModelViewSet):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer
    permission_classes = [IsTeacher | IsSuperAdmin]
