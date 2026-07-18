from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser,Batch, Trainee, Trainer,AssignmentType, Assignment


    
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'role', 'domain', 'is_staff')
    list_filter = ('role', 'domain', 'is_staff', 'is_superuser')
    fieldsets = (
        (None, {'fields': ('username', 'email', 'password')}),
        ('Personal Info', {'fields': ('role', 'domain')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'role', 'domain', 'password1', 'password2'),
        }),
    )
    search_fields = ('username', 'email')
    ordering = ('email',)
class BatchAdmin(admin.ModelAdmin):
    list_display = ('id','batchname', 'domain', 'trainer', 'start_date', 'end_date')
    list_filter = ('domain',)
    search_fields = ('batchname', 'domain')
    raw_id_fields = ('trainer',)

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'trainer':
            # Only show trainers
            kwargs['queryset'] = CustomUser.objects.filter(role='trainer')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
    
#Trainee Admin

class TraineeAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'batch', 'trainername', 'domain')
    list_filter = ('domain', 'batch')
    search_fields = ('user__username', 'user__email', 'batch__batchname', 'trainername', 'domain')
    raw_id_fields = ('user', 'batch')   # to easily select from large tables

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'user':
            # Only show users with role = trainee
            kwargs['queryset'] = CustomUser.objects.filter(role='trainee')
        elif db_field.name == 'batch':
            # Batch anni chupistundi (optional: filter cheyyachu domain tho)
            kwargs['queryset'] = Batch.objects.all()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)

# Trainer Admin
class TrainerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'get_email', 'get_role', 'get_domain')
    search_fields = ('user__username', 'user__email')
    raw_id_fields = ('user',)

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = 'Email'

    def get_role(self, obj):
        return obj.user.role
    get_role.short_description = 'Role'

    def get_domain(self, obj):
        return obj.user.domain
    get_domain.short_description = 'Domain'

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == 'user':
            # Only trainers from CustomUser
            kwargs['queryset'] = CustomUser.objects.filter(role='trainer')
        return super().formfield_for_foreignkey(db_field, request, **kwargs)





##################################################################
# Tranier dashboard
class AssignmentTypeAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'due_date', 'status', 'created_by')
    list_filter = ('status', 'type', 'created_date')
    search_fields = ('title', 'description')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Batch, BatchAdmin)
admin.site.register(Trainee, TraineeAdmin)
admin.site.register(Trainer, TrainerAdmin)
admin.site.register(AssignmentType, AssignmentTypeAdmin)
admin.site.register(Assignment, AssignmentAdmin)
