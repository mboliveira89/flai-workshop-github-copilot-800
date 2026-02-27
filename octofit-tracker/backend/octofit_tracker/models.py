from djongo import models


class User(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)

    class Meta:
        db_table = 'users'

    def __str__(self):
        return self.username


class Team(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    members = models.ArrayReferenceField(
        to=User,
        on_delete=models.CASCADE,
        blank=True,
    )

    class Meta:
        db_table = 'teams'

    def __str__(self):
        return self.name


class Activity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    activity_type = models.CharField(max_length=100)
    duration = models.FloatField()  # in minutes
    date = models.DateField()

    class Meta:
        db_table = 'activities'

    def __str__(self):
        return f"{self.user.username} - {self.activity_type} on {self.date}"


class Leaderboard(models.Model):
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    points = models.IntegerField(default=0)

    class Meta:
        db_table = 'leaderboard'

    def __str__(self):
        return f"{self.team.name}: {self.points} points"


class Workout(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    exercises = models.TextField(blank=True)  # comma-separated list

    class Meta:
        db_table = 'workouts'

    def __str__(self):
        return self.name
