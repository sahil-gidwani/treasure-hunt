from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from django.urls import reverse
from .models import CustomUser
from .serializer import RegisterSerializer


class CustomUserModelTest(TestCase):
    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(
            email='test@example.com',
            password='password123',
            age=25,
            gender='Male',
            current_level=1,
            current_score=0,
            high_score=0,
        )

        self.assertEqual(user.email, 'test@example.com')
        self.assertTrue(user.check_password('password123'))
        self.assertEqual(user.age, 25)
        self.assertEqual(user.gender, 'Male')
        self.assertEqual(user.current_level, 1)
        self.assertEqual(user.current_score, 0)
        self.assertEqual(user.high_score, 0)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)

    def test_create_superuser(self):
        User = get_user_model()
        superuser = User.objects.create_superuser(
            email='admin@example.com',
            password='password123',
            age=30,
            gender='Female',
            current_level=1,
            current_score=0,
            high_score=0,
        )

        self.assertEqual(superuser.email, 'admin@example.com')
        self.assertTrue(superuser.check_password('password123'))
        self.assertEqual(superuser.age, 30)
        self.assertEqual(superuser.gender, 'Female')
        self.assertEqual(superuser.current_level, 1)
        self.assertEqual(superuser.current_score, 0)
        self.assertEqual(superuser.high_score, 0)
        self.assertTrue(superuser.is_staff)
        self.assertTrue(superuser.is_superuser)


class UserTests(TestCase):

    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('auth_register')
        self.valid_payload = {
            'email': 'test@test.com',
            'password1': 'test_password',
            'password2': 'test_password',
            'age': 25,
            'gender': 'Male'
        }
        self.invalid_payload = {
            'email': 'invalid_email',
            'password1': 'test_password',
            'password2': 'test_password_incorrect',
            'age': -2,
            'gender': 'Male'
        }

    def test_create_valid_user(self):
        response = self.client.post(
            self.register_url,
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_user(self):
        response = self.client.post(
            self.register_url,
            data=self.invalid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user_already_exists(self):
        user = CustomUser.objects.create_user(
            email='test@test.com',
            password='test_password',
            age=25,
            gender='Male'
        )
        serializer = RegisterSerializer(user)
        response = self.client.post(
            self.register_url,
            data=serializer.data,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
