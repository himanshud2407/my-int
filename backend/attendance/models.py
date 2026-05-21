from django.db import models
from students.models import Student

class Attendance(models.Model):
    STATUS_CHOICES = (
        ('Present', 'Present'),
        ('Absent', 'Absent'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    marked_by = models.CharField(max_length=50, default='Manual') # 'Manual' or 'FaceRec'
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'date')

    def __str__(self):
        return f"{self.student.roll_number} - {self.date} - {self.status}"

class FaceEmbedding(models.Model):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='face_embedding')
    embedding = models.JSONField() # Store as list of floats
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Embedding for {self.student.roll_number}"
