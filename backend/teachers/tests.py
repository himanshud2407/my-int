from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Teacher

User = get_user_model()

class TeacherAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username='admin', password='adminpassword123', role='super_admin', email='admin@test.com')
        self.client.force_authenticate(user=self.admin_user)
        self.teacher_user = User.objects.create_user(username='teacher1', password='password123', role='teacher', email='t1@test.com')

    def test_create_teacher_profile(self):
        data = {
            "user": self.teacher_user.id,
            "employee_id": "T001",
            "department": "Science",
            "qualification": "PhD"
        }
        response = self.client.post('/api/teachers/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Teacher.objects.count(), 1)
        self.assertEqual(Teacher.objects.get().employee_id, "T001")
