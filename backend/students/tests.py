from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from .models import Student

User = get_user_model()

class StudentAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username='admin', password='adminpassword123', role='super_admin', email='admin@test.com')
        self.client.force_authenticate(user=self.admin_user)
        self.student_user = User.objects.create_user(username='student1', password='password123', role='student', email='s1@test.com')

    def test_create_student_profile(self):
        data = {
            "user": self.student_user.id,
            "roll_number": "S101",
            "date_of_birth": "2005-01-01",
            "address": "123 Street",
            "guardian_name": "John Doe"
        }
        response = self.client.post('/api/students/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Student.objects.count(), 1)
        self.assertEqual(Student.objects.get().roll_number, "S101")
