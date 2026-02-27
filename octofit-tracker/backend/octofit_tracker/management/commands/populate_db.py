from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')
        # Marvel heroes
        ironman = User.objects.create(
            username='ironman',
            email='tony@starkindustries.com',
            password='iamironman',
            first_name='Tony',
            last_name='Stark',
        )
        spiderman = User.objects.create(
            username='spiderman',
            email='peter@marvel.com',
            password='webhead',
            first_name='Peter',
            last_name='Parker',
        )
        blackwidow = User.objects.create(
            username='blackwidow',
            email='natasha@marvel.com',
            password='romanoff',
            first_name='Natasha',
            last_name='Romanoff',
        )
        # DC heroes
        batman = User.objects.create(
            username='batman',
            email='bruce@wayneenterprises.com',
            password='darkknight',
            first_name='Bruce',
            last_name='Wayne',
        )
        wonderwoman = User.objects.create(
            username='wonderwoman',
            email='diana@dc.com',
            password='amazonian',
            first_name='Diana',
            last_name='Prince',
        )
        flash = User.objects.create(
            username='flash',
            email='barry@starlabs.com',
            password='speedforce',
            first_name='Barry',
            last_name='Allen',
        )

        self.stdout.write('Creating teams...')
        team_marvel = Team.objects.create(
            name='Team Marvel',
            description='Earth\'s Mightiest Heroes',
        )
        team_marvel.members.add(ironman, spiderman, blackwidow)

        team_dc = Team.objects.create(
            name='Team DC',
            description='DC\'s Finest Heroes',
        )
        team_dc.members.add(batman, wonderwoman, flash)

        self.stdout.write('Creating activities...')
        Activity.objects.create(
            user=ironman,
            activity_type='Running',
            duration=45.0,
            date=date(2024, 1, 15),
        )
        Activity.objects.create(
            user=spiderman,
            activity_type='Climbing',
            duration=60.0,
            date=date(2024, 1, 15),
        )
        Activity.objects.create(
            user=blackwidow,
            activity_type='Martial Arts',
            duration=90.0,
            date=date(2024, 1, 16),
        )
        Activity.objects.create(
            user=batman,
            activity_type='Cycling',
            duration=120.0,
            date=date(2024, 1, 15),
        )
        Activity.objects.create(
            user=wonderwoman,
            activity_type='Strength Training',
            duration=75.0,
            date=date(2024, 1, 16),
        )
        Activity.objects.create(
            user=flash,
            activity_type='Running',
            duration=30.0,
            date=date(2024, 1, 17),
        )

        self.stdout.write('Creating leaderboard entries...')
        Leaderboard.objects.create(team=team_marvel, points=450)
        Leaderboard.objects.create(team=team_dc, points=500)

        self.stdout.write('Creating workouts...')
        Workout.objects.create(
            name='Iron Man Cardio Blast',
            description='High-intensity cardio circuit inspired by Tony Stark\'s training',
            exercises='Arc Reactor Sprint,Repulsor Push-ups,Armor Plank Hold,Jet Boost Jumps',
        )
        Workout.objects.create(
            name='Spider Agility Training',
            description='Agility and flexibility workout inspired by Peter Parker',
            exercises='Web Swing Swings,Spider Crawls,Wall-touch Jumps,Silk Thread Balance',
        )
        Workout.objects.create(
            name='Dark Knight Strength',
            description='Strength and endurance training inspired by Batman',
            exercises='Bat Push-ups,Gotham Squats,Batarang Lat Pulls,Cave Run',
        )
        Workout.objects.create(
            name='Amazonian Warrior',
            description='Full-body warrior workout inspired by Wonder Woman',
            exercises='Lasso Lunges,Shield Press,Tiara Throws,Paradise Island Swim',
        )
        Workout.objects.create(
            name='Speed Force Intervals',
            description='Speed and endurance intervals inspired by The Flash',
            exercises='Lightning Sprints,Speed Force Burpees,Treadmill Max Pace,Reverse Flash Drills',
        )

        self.stdout.write(self.style.SUCCESS(
            'Successfully populated octofit_db with superhero test data!'
        ))
