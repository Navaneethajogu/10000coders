from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

class Command(BaseCommand):
    help = 'Fixes users with plaintext passwords by hashing them properly.'

    def handle(self, *args, **options):
        User = get_user_model()
        fixed_count = 0

        for user in User.objects.all():
            if not user.password.startswith('pbkdf2_'):
                self.stdout.write(f"Fixing password for user: {user.username}")
                raw_password = user.password  # assuming it's the plain password
                user.set_password(raw_password)
                user.save()
                fixed_count += 1
            else:
                self.stdout.write(f"Password already hashed for user: {user.username}")

        self.stdout.write(self.style.SUCCESS(f"✅ Fixed {fixed_count} user(s) with plaintext passwords."))
