from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from students.models import Student
from .models import Fee
import datetime

User = get_user_model()

class FeeTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_superuser(username='admin', password='adminpassword123', role='super_admin', email='admin@test.com')
        self.client.force_authenticate(user=self.admin_user)

        self.student_user = User.objects.create_user(username='student1', password='password123', role='student', email='s1@test.com')
        self.student = Student.objects.create(
            user=self.student_user,
            roll_number="S101",
            date_of_birth="2005-01-01",
            address="Street",
            guardian_name="Guardian"
        )

    def test_create_fee(self):
        data = {
            "student": self.student.id,
            "amount": "1000.00",
            "due_date": datetime.date.today().isoformat(),
            "status": "Unpaid"
        }
        response = self.client.post('/api/fees/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Fee.objects.count(), 1)
