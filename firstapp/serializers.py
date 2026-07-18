from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import CustomUser,Batch, Trainee, Trainer
from .models import AssignmentType, Assignment



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = CustomUser.EMAIL_FIELD  # 👈 use email for login

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['role'] = user.role
        token['username'] = user.username  # include display name in token
        return token


class UserSerializer(serializers.ModelSerializer):
    batchId = serializers.IntegerField(source='trainee.batch.id', read_only=True)  # Add this lin
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'role', 'domain', 'password','batchId']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            role=validated_data.get('role'),
            domain=validated_data.get('domain'),
            password=validated_data['password']
        )
        return user
    
    
    
# Batch Serializer
class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = ['id', 'batchname', 'domain', 'trainer', 'start_date', 'end_date']

    def validate(self, data):
        if data['trainer'].role != 'trainer' or data['trainer'].domain != data['domain']:
            raise serializers.ValidationError("Trainer's domain must match batch domain.")
        return data

# Trainee Serializer
class TraineeCreateSerializer(serializers.ModelSerializer):
    name = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    batch_id = serializers.IntegerField(write_only=True)
    trainername = serializers.CharField(write_only=True)   # compulsory
    domain = serializers.CharField(write_only=True)        # compulsory

    class Meta:
        model = Trainee
        fields = ['name', 'email', 'password', 'batch_id', 'trainername', 'domain']

    def create(self, validated_data):
        name = validated_data.pop('name')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        batch_id = validated_data.pop('batch_id')
        trainername = validated_data.pop('trainername')
        domain = validated_data.pop('domain')

        user = CustomUser.objects.create_user(
            username=email,
            email=email,
            password=password,
            first_name=name,
            role='trainee'
        )

        batch = Batch.objects.get(id=batch_id)

        user.domain = domain
        user.save()

        trainee = Trainee.objects.create(
            user=user,
            batch=batch,
            trainername=trainername,
            domain=domain
        )
        return trainee

  #Trainer Serializer  
class TrainerCreateSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(write_only=True)
    domain = serializers.CharField(write_only=True)

    class Meta:
        model = Trainer
        fields = ['username', 'email', 'password', 'domain']

    def validate(self, data):
        if CustomUser.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError({"username": "A user with that username already exists."})
        if CustomUser.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "A user with that email already exists."})
        return data

    def create(self, validated_data):
        username = validated_data.pop('username')
        email = validated_data.pop('email')
        password = validated_data.pop('password')
        domain = validated_data.pop('domain')

        user = CustomUser.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=username,
            role='trainer'
        )
        user.domain = domain
        user.save()

        trainer = Trainer.objects.create(user=user, domain=domain)
        return trainer
    
    
    #Trainer dashboard
class AssignmentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentType
        fields = ['id', 'name']

class AssignmentSerializer(serializers.ModelSerializer):
    # Accept plain IDs for type and assigned_to
    type = serializers.PrimaryKeyRelatedField(queryset=AssignmentType.objects.all())
    assigned_to = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Batch.objects.all()
    )
    created_by = serializers.StringRelatedField(read_only=True)
    total_students = serializers.SerializerMethodField()
    submitted_by = serializers.SerializerMethodField()

    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'description', 'type', 'assigned_to', 'due_date',
            'max_marks', 'status', 'created_date', 'created_by',
            'total_students', 'submitted_by', 'attachments'
        ]

    def get_total_students(self, obj):
        return sum(batch.trainee_set.count() for batch in obj.assigned_to.all())

    def get_submitted_by(self, obj):
        return 0  # Placeholder

    def create(self, validated_data):
        assigned_to = validated_data.pop('assigned_to', [])
        assignment = Assignment.objects.create(**validated_data)
        assignment.assigned_to.set(assigned_to)
        return assignment
    
   