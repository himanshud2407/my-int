from rest_framework import viewsets
from .models import Student
from .serializers import StudentSerializer
from users.permissions import IsSuperAdmin

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsSuperAdmin] # Only admin can manage students directly
