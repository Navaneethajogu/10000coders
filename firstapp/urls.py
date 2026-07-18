from django.urls import path
# from .views import MyTokenObtainPairView,CreateBatch, TrainerListView, TraineeListView, BatchListView,trainer_dashboard_data, add_trainee
from .views import (
    MyTokenObtainPairView,
    create_batch,
    TrainerListView,
    TraineeListView,
    BatchListView,
    trainer_dashboard_data,
    add_trainee,
    trainee_dashboard_data,
     add_trainer,  # Import the add_trainer view
    assignment_types_list,  # Updated from AssignmentTypeListView
    assignment_create,     # Updated from AssignmentCreateView
    assignment_list,       # Updated from AssignmentListView
    trainer_create_batch,  # New import
)

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('batches/', create_batch, name='create_batch'),  # Admin creates batches
    path('trainer-create-batch/', trainer_create_batch, name='trainer_create_batch'),  # New for trainers
    path('trainers/', TrainerListView.as_view(), name='trainers_list'),
    path('trainees/', TraineeListView.as_view(), name='trainees_list'),
    path('batches-list/', BatchListView.as_view(), name='batches_list'),
    path('trainer-dashboard/', trainer_dashboard_data, name='trainer_dashboard_data'),
    path('add-trainee/', add_trainee, name='add-trainee'),
    path('trainee-dashboard/', trainee_dashboard_data, name='trainee_dashboard_data'),
    path('add-trainer/', add_trainer, name='add-trainer'),  # New URL for adding trainers
   path('assignment-types/', assignment_types_list, name='assignment-type-list'),  # Updated
    path('assignments/create/', assignment_create, name='assignment-create'),       # Updated
    path('assignments/', assignment_list, name='assignment-list'),                  # Updated

]