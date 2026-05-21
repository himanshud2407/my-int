from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from students.views import StudentViewSet
from teachers.views import TeacherViewSet
from attendance.views import AttendanceViewSet, FaceEmbeddingViewSet
from exams.views import ExamViewSet, ResultViewSet
from fees.views import FeeViewSet
from timetable.views import SubjectViewSet, TimetableViewSet
from documents.views import DocumentViewSet
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'teachers', TeacherViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'face-embeddings', FaceEmbeddingViewSet)
router.register(r'exams', ExamViewSet)
router.register(r'results', ResultViewSet)
router.register(r'fees', FeeViewSet)
router.register(r'subjects', SubjectViewSet)
router.register(r'timetable', TimetableViewSet)
router.register(r'documents', DocumentViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include("users.urls")),
    path("api/", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
