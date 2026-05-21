from rest_framework import viewsets
from .models import Fee
from .serializers import FeeSerializer
from users.permissions import IsSuperAdmin, IsStudent

class FeeViewSet(viewsets.ModelViewSet):
    queryset = Fee.objects.all()
    serializer_class = FeeSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = [IsSuperAdmin | IsStudent]
        else:
            permission_classes = [IsSuperAdmin]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'student':
            return Fee.objects.filter(student__user=user)
        return Fee.objects.all()
