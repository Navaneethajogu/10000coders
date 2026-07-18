from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('trainer', 'Trainer'),
        ('trainee', 'Trainee'),
    )
    DOMAIN_CHOICES = (
        ('java', 'Java'),
        ('python', 'Python'),
        ('web_developer', 'Web Developer'),
        ('testing', 'Testing'),
        ('devops', 'DevOps'),
        ('powerbi', 'Power BI'),
    )
    
    username = models.CharField(max_length=150, unique=True)  # this will be their name
    email = models.EmailField(('email address'), unique=True)

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    domain = models.CharField(max_length=20, choices=DOMAIN_CHOICES, null=True, blank=True)

    USERNAME_FIELD = 'email'   # 👈 login with email
    REQUIRED_FIELDS = ['username', 'role']  # when creating superuser, must provide these

    def __str__(self):
        return f"{self.username} ({self.email}) - {self.role}"
        

    
class Batch(models.Model):
    batchname = models.CharField(max_length=100)
    domain = models.CharField(max_length=20, choices=CustomUser.DOMAIN_CHOICES)
    trainer = models.ForeignKey(
        CustomUser, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='batches_trained'
    )
    start_date = models.DateField()
    end_date = models.DateField()

    def __str__(self):
        return f"{self.batchname} ({self.domain})"
  # trainee Model  
class Trainee(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    batch = models.ForeignKey(Batch, on_delete=models.CASCADE)
    trainername = models.CharField(max_length=100 )
    domain = models.CharField(max_length=100, null=True, blank=True)

    def __str__(self):
        return self.user.username


# ✅ Separate Trainer table
class Trainer(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    domain = models.CharField(max_length=100, null=True, blank=True)  # 👈 allow nulls
    def __str__(self):
        return self.user.username




##############################################################################
# Trainer dashbord

class AssignmentType(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Assignment(models.Model):
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('overdue', 'Overdue'),
    )

    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.ForeignKey(AssignmentType, on_delete=models.CASCADE)
    assigned_to = models.ManyToManyField(Batch, related_name='assignments')
    due_date = models.DateField()
    max_marks = models.PositiveIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    created_date = models.DateField(auto_now_add=True)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='created_assignments')
    attachments = models.FileField(upload_to='assignments/attachments/', blank=True, null=True)

    def __str__(self):
        return self.title



