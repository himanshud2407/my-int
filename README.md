# Institute Management System (IMS)

A production-ready system for educational institutes featuring face recognition attendance, role-based dashboards, and automated management of students, teachers, exams, fees, timetables, and documents.

## 🚀 Features
- **Centralized Management**: Admin dashboard to manage students, teachers, and staff.
- **Biometric Attendance**: Face recognition-based attendance marking using WebRTC and DeepFace microservice.
- **Real-time Analytics**: Live statistics on student enrollment and daily attendance.
- **Role-Based Access (RBAC)**: Distinct layouts and permissions for Admin, Teacher, and Student roles.
- **Academic Tracking**: Comprehensive management of Exams, Results, and class Timetables.
- **Financial Module**: Student fee tracking, status management, and reporting.
- **Document Management**: Secure file upload and sharing for study materials.

## ⚙️ Tech Stack
- **Frontend**: Next.js 15 (App Router), Tailwind CSS 4, Axios, Lucide React.
- **Backend**: Django 5.1, Django REST Framework, SimpleJWT.
- **Face Service**: FastAPI, DeepFace, OpenCV.
- **Database**: PostgreSQL (Production) / SQLite (Development).
- **Environment**: Environment variable configuration via `django-environ`.

## 🛠️ Setup Instructions

### 1. Backend Setup (Django)
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install django djangorestframework django-cors-headers djangorestframework-simplejwt django-environ pillow
# Create a .env file (template in ARCHITECTURE.md)
python manage.py migrate
python manage.py runserver
```

### 2. Face Recognition Service (FastAPI)
```bash
cd face-service
pip install fastapi uvicorn deepface opencv-python-headless tf-keras
uvicorn main:app --port 8001
```

### 3. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```

## 📦 Deployment Strategy
- **Frontend**: Vercel (Auto-deploys from `frontend/` directory).
- **Backend**: AWS Elastic Beanstalk (Python 3.12+).
- **Database**: AWS RDS (PostgreSQL).
- **Storage**: AWS S3 for media and static files.

## 🏗️ Architecture
Refer to [ARCHITECTURE.md](./ARCHITECTURE.md) for the full system design and database schema.
