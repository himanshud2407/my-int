from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from students.models import Student
from attendance.models import FaceEmbedding

User = get_user_model()

class AttendancePermissionTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher_user = User.objects.create_user(username='teacher1', password='password123', role='teacher')
        self.student_user = User.objects.create_user(username='student1', password='password123', role='student')
        self.student = Student.objects.create(user=self.student_user, roll_number="S1", date_of_birth="2000-01-01")
        self.embedding = FaceEmbedding.objects.create(student=self.student, embedding=[0.1]*128)

    def test_teacher_can_view_embeddings(self):
        self.client.force_authenticate(user=self.teacher_user)
        response = self.client.get('/api/face-embeddings/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
