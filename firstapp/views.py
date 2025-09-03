from rest_framework_simplejwt.views import TokenObtainPairView 
from rest_framework.permissions import AllowAny
from .serializers import MyTokenObtainPairSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import  IsAdminUser
from rest_framework import status
from .models import CustomUser, Batch,Trainee
from .serializers import UserSerializer, BatchSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import UserSerializer, BatchSerializer
from rest_framework import generics, permissions, serializers
from .serializers import TraineeCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    permission_classes = [AllowAny]

# Create Batch and Assign Trainer (Admin Only)
# class CreateBatch(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = BatchSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(created_by=request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    



# ✅ Create Batch (from frontend form)
@api_view(['POST'])
@permission_classes([IsAuthenticated])   # only logged-in users can create
def create_batch(request):
    serializer = BatchSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()  # 👈 removed created_by
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# List Trainers
class TrainerListView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(role='trainer')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# List Trainees
class TraineeListView(generics.ListAPIView):
    queryset = CustomUser.objects.filter(role='trainee')
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

# List Batches
# class BatchListView(generics.ListAPIView):
#     queryset = Batch.objects.all()
#     serializer_class = BatchSerializer
#     permission_classes = [IsAuthenticated]
    
    
    
    # views.py (BatchListView section)
class BatchListView(generics.ListAPIView):
    queryset = Batch.objects.all()
    serializer_class = BatchSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        batch_data = serializer.data

        for batch in batch_data:
            trainees = CustomUser.objects.filter(
                role='trainee',
                trainee__batch__id=batch['id']
            )
            batch['trainees'] = UserSerializer(trainees, many=True).data
            batch['trainee_count'] = trainees.count()

        return Response(batch_data)
# Trainer Dashboard Data (Trainer Only) 
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def trainer_dashboard_data(request):
#     if request.user.role != 'trainer':
#         return Response({"error": "Only trainers can access this"}, status=403)

#     trainer_domain = request.user.domain

#     # ఆ trainer కి సంబంధించిన batches
#     batches = Batch.objects.filter(domain=trainer_domain, trainer=request.user)

#     # ఆ domain లో ఉన్న trainees
#     trainees = CustomUser.objects.filter(role='trainee', domain=trainer_domain)

#     return Response({
#         "domain": trainer_domain,
#         "batches": BatchSerializer(batches, many=True).data,
#         "trainees": UserSerializer(trainees, many=True).data
#     })
    


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trainer_dashboard_data(request):
    if request.user.role != 'trainer':
        return Response({"error": "Only trainers can access this"}, status=403)

    trainer_domain = request.user.domain

    # Get batches for the trainer's domain
    batches = Batch.objects.filter(domain=trainer_domain, trainer=request.user)

    # Prepare data structure with member details for each batch
    batch_data = []
    for batch in batches:
        # Get trainees assigned to this batch
        trainees_in_batch = CustomUser.objects.filter(
            role='trainee',
            domain=trainer_domain,
            trainee__batch=batch  # Join with Trainee model to filter by batch
        )
        # Serialize trainee details
        trainee_details = UserSerializer(trainees_in_batch, many=True).data

        batch_data.append({
            "batch": BatchSerializer(batch).data,  # Batch details
            "members": trainee_details  # List of member details
        })

    # Get all trainees in the domain (for overview, if needed)
    all_trainees = CustomUser.objects.filter(role='trainee', domain=trainer_domain)

    return Response({
        "domain": trainer_domain,
        "batches_with_members": batch_data,  # New structure with member details
        "trainees": UserSerializer(all_trainees, many=True).data  # Optional: all trainees
    })  
    
 # Add Trainee
# User = get_user_model()
# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def add_trainee(request):
#     name = request.data.get('name')
#     email = request.data.get('email')
#     password = request.data.get('password')
#     # batch_id = request.data.get('batch_id')
#     batchId = request.data.get('batchId')  # Changed from batch_id to batchId
#     trainername = request.data.get('trainername')
#     domain = request.data.get('domain')

#     # All compulsory fields check
#     if not all([name, email, password,batchId, trainername, domain]):
#         return Response({'error': 'All fields (name, email, password, batch_id, trainername, domain) are required'}, status=400)

#     try:
#         batch = Batch.objects.get(id=batchId)
#     except Batch.DoesNotExist:
#         return Response({'error': 'Batch not found'}, status=404)

#     trainee_user = User(
#         username=email,
#         email=email,
#         first_name=name,
#         role='trainee',
#         domain=domain
#     )
#     trainee_user.set_password(password)
#     trainee_user.save()

#     Trainee.objects.create(
#         user=trainee_user,
#         batch=batch,
#         trainername=trainername,
#         domain=domain
#     )

#     return Response({'message': 'Trainee added successfully!'}, status=201)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_trainee(request):
    name = request.data.get('name')
    email = request.data.get('email')
    password = request.data.get('password')
    batchId = request.data.get('batchId')  # Changed from batch_id to batchId
    trainername = request.data.get('trainername')
    domain = request.data.get('domain')

    # All compulsory fields check
    if not all([name, email, password, batchId, trainername, domain]):
        return Response({'error': 'All fields (name, email, password, batchId, trainername, domain) are required'}, status=400)

    try:
        batch = Batch.objects.get(id=batchId)  # Updated to use batchId
    except Batch.DoesNotExist:
        return Response({'error': 'Batch not found'}, status=404)

    # Validate that the domain matches the batch's domain
    if batch.domain != domain:
        return Response({'error': 'Trainee domain must match the batch domain'}, status=400)

    trainee_user = CustomUser(
        username=email,
        email=email,
        first_name=name,
        role='trainee',
        domain=domain
    )
    trainee_user.set_password(password)
    trainee_user.save()

    Trainee.objects.create(
        user=trainee_user,
        batch=batch,
        trainername=trainername,
        domain=domain
    )

    return Response({'message': 'Trainee added successfully!'}, status=201)

# Trainee Dashboard Data (Trainee Only)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Trainee
from .serializers import BatchSerializer, UserSerializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def trainee_dashboard_data(request):
    # Check if logged-in user is trainee
    if request.user.role != 'trainee':
        return Response({"error": "Only trainees can access this"}, status=403)

    # Get trainee profile
    try:
        trainee_profile = Trainee.objects.get(user=request.user)
    except Trainee.DoesNotExist:
        return Response({"error": "Trainee profile not found"}, status=404)

    # Get batch info
    trainee_batch = trainee_profile.batch

    # Serialize only this trainee’s data
    trainee_data = UserSerializer(request.user).data
    batch_data = BatchSerializer(trainee_batch).data

    return Response({
        "batch": batch_data,
        "trainee": trainee_data,  # Only logged-in trainee's details
    })
    
    # Add Trainer (Admin Only)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, Trainer
from .serializers import TrainerCreateSerializer
from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_trainer(request):
    serializer = TrainerCreateSerializer(data=request.data)
    if serializer.is_valid():
        trainer = serializer.save()
        return Response({'message': 'Trainer added successfully!'}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)