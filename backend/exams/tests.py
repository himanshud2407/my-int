from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from students.models import Student
from .models import Exam, Result
import datetime

User = get_user_model()

class ExamTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.teacher_user = User.objects.create_user(username='teacher1', password='password123', role='teacher', email='t1@test.com')
        self.client.force_authenticate(user=self.teacher_user)

        self.student_user = User.objects.create_user(username='student1', password='password123', role='student', email='s1@test.com')
        self.student = Student.objects.create(
            user=self.student_user,
            roll_number="S101",
            date_of_birth="2005-01-01",
            address="Street",
            guardian_name="Guardian"
        )
        self.exam = Exam.objects.create(title="Math Midterm", date=datetime.date.today(), max_marks=100)

    def test_post_marks(self):
        data = {
            "exam": self.exam.id,
            "student": self.student.id,
            "marks_obtained": 85,
            "grade": "A"
        }
        response = self.client.post('/api/results/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Result.objects.count(), 1)
