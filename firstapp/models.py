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
    # role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    # domain = models.CharField(max_length=20, choices=DOMAIN_CHOICES, null=True, blank=True)
    # email = models.EmailField(unique=True)

    # def __str__(self):
    #     return f"{self.username} ({self.role})"
    # def save(self, *args, **kwargs):
    #     # Force username = email for trainer and trainee roles
    #     if self.role in ['admin','trainer', 'trainee'] and self.email:
    #         self.username = self.email
    #     super().save(*args, **kwargs)
    
        # keep username as "name"
    username = models.CharField(max_length=150, unique=True)  # this will be their name
    email = models.EmailField(('email address'), unique=True)

    role = models.CharField(max_length=10, choices=ROLE_CHOICES)
    domain = models.CharField(max_length=20, choices=DOMAIN_CHOICES, null=True, blank=True)

    USERNAME_FIELD = 'email'   # 👈 login with email
    REQUIRED_FIELDS = ['username', 'role']  # when creating superuser, must provide these

    def __str__(self):
        return f"{self.username} ({self.email}) - {self.role}"
        
#     # Batch Model
# class Batch(models.Model):
#     batchname = models.CharField(max_length=100)
#     domain = models.CharField(max_length=20, choices=CustomUser.DOMAIN_CHOICES)
#     trainer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name='batches_trained')
#     created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='batches_created')  # Admin
#     start_date = models.DateField()
#     end_date = models.DateField()

#     def __str__(self):
#         return f"{self.batchname} ({self.domain})"
    
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




