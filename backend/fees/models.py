from django.db import models
from students.models import Student

class Fee(models.Model):
    STATUS_CHOICES = (
        ('Paid', 'Paid'),
        ('Unpaid', 'Unpaid'),
        ('Partial', 'Partial'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='fees')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='Unpaid')
    transaction_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.student.roll_number} - {self.amount} - {self.status}"
