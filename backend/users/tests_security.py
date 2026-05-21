from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status

User = get_user_model()

class AuthSecurityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = '/api/auth/register/'

    def test_register_role_ignored(self):
        data = {
            "username": "attacker",
            "password": "password123",
            "email": "attacker@example.com",
            "role": "super_admin" # Attempting to escalate role
        }
        response = self.client.post(self.register_url, data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        user = User.objects.get(username="attacker")
        self.assertEqual(user.role, 'student') # Should default to student, not super_admin
