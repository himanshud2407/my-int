from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class AuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/auth/register/'
        self.login_url = '/api/auth/login/'

    def test_register_user(self):
        data = {
            "username": "testuser",
            "password": "testpassword123",
            "email": "test@example.com",
            "role": "student"
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get().role, 'student')

    def test_login_user(self):
        User.objects.create_user(username='testuser', password='testpassword123', role='teacher')
        data = {
            "username": "testuser",
            "password": "testpassword123"
        }
        response = self.client.post(self.login_url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
