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
)

from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('batches/', create_batch, name='create_batch'),  # Admin creates batches
    path('trainers/', TrainerListView.as_view(), name='trainers_list'),
    path('trainees/', TraineeListView.as_view(), name='trainees_list'),
    path('batches-list/', BatchListView.as_view(), name='batches_list'),
    path('trainer-dashboard/', trainer_dashboard_data, name='trainer_dashboard_data'),
    path('add-trainee/', add_trainee, name='add-trainee'),
    path('trainee-dashboard/', trainee_dashboard_data, name='trainee_dashboard_data'),
    path('add-trainer/', add_trainer, name='add-trainer'),  # New URL for adding trainers

]