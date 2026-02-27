from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
import datetime


class UserTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username='testuser',
            email='testuser@example.com',
            password='testpassword',
            first_name='Test',
            last_name='User',
        )

    def test_get_users(self):
        response = self.client.get('/api/users/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        data = {
            'username': 'newuser',
            'email': 'newuser@example.com',
            'password': 'newpassword',
            'first_name': 'New',
            'last_name': 'User',
        }
        response = self.client.post('/api/users/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_user_detail(self):
        response = self.client.get(f'/api/users/{self.user.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'testuser')


class TeamTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username='teamuser',
            email='teamuser@example.com',
            password='pass',
        )
        self.team = Team.objects.create(
            name='Alpha Team',
            description='Test team',
        )

    def test_get_teams(self):
        response = self.client.get('/api/teams/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_team(self):
        data = {'name': 'Beta Team', 'description': 'Another team'}
        response = self.client.post('/api/teams/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_team_detail(self):
        response = self.client.get(f'/api/teams/{self.team.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Alpha Team')


class ActivityTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create(
            username='activityuser',
            email='activityuser@example.com',
            password='pass',
        )
        self.activity = Activity.objects.create(
            user=self.user,
            activity_type='Running',
            duration=30.0,
            date=datetime.date.today(),
        )

    def test_get_activities(self):
        response = self.client.get('/api/activities/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_activity(self):
        data = {
            'user_id': self.user.pk,
            'activity_type': 'Cycling',
            'duration': 45.0,
            'date': str(datetime.date.today()),
        }
        response = self.client.post('/api/activities/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_activity_detail(self):
        response = self.client.get(f'/api/activities/{self.activity.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['activity_type'], 'Running')


class LeaderboardTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.team = Team.objects.create(
            name='Leaderboard Team',
            description='Test',
        )
        self.entry = Leaderboard.objects.create(
            team=self.team,
            points=100,
        )

    def test_get_leaderboard(self):
        response = self.client.get('/api/leaderboard/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_leaderboard_entry(self):
        team2 = Team.objects.create(name='Team 2', description='')
        data = {'team_id': team2.pk, 'points': 200}
        response = self.client.post('/api/leaderboard/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_leaderboard_detail(self):
        response = self.client.get(f'/api/leaderboard/{self.entry.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['points'], 100)


class WorkoutTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.workout = Workout.objects.create(
            name='Morning Routine',
            description='A morning workout',
            exercises='Push-ups, Squats, Lunges',
        )

    def test_get_workouts(self):
        response = self.client.get('/api/workouts/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_workout(self):
        data = {
            'name': 'Evening Routine',
            'description': 'An evening workout',
            'exercises': 'Pull-ups, Deadlifts',
        }
        response = self.client.post('/api/workouts/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_workout_detail(self):
        response = self.client.get(f'/api/workouts/{self.workout.pk}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Morning Routine')


class ApiRootTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_api_root(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('users', response.data)
        self.assertIn('teams', response.data)
        self.assertIn('activities', response.data)
        self.assertIn('leaderboard', response.data)
        self.assertIn('workouts', response.data)

    def test_root_redirects_to_api(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
