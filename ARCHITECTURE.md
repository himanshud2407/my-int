# Institute Management System (IMS) Architecture

## Overview
The IMS is a production-ready, full-stack application designed to automate educational institute operations, including student/teacher management, attendance via face recognition, exams, fees, timetable, and documents.

## System Components

### 1. Frontend (Next.js 14+ App Router)
- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Authentication**: JWT stored in cookies.
- **Attendance**: WebRTC for camera access, interfacing with the Face Recognition service.

### 2. Backend (Django + Django REST Framework)
- **Framework**: Django
- **API**: Django REST Framework (DRF)
- **Database**: PostgreSQL (configured via DATABASE_URL)
- **Authentication**: JWT (SimpleJWT)
- **RBAC**: Custom permissions for Super Admin, Teacher, and Student roles.

### 3. Face Recognition Microservice (FastAPI)
- **Framework**: FastAPI
- **ML Libraries**: DeepFace, OpenCV
- **Function**: Extracts face embeddings and performs verification.

## Database Schema (Relational)

### Users & RBAC
- **User**: `id`, `username`, `email`, `password`, `role` (super_admin/teacher/student).

### Core Entities
- **Student**: `id`, `user_id` (FK), `roll_number`, `date_of_birth`, etc.
- **Teacher**: `id`, `user_id` (FK), `employee_id`, `department`, etc.

### Academic & Finance
- **Attendance**: `id`, `student_id`, `date`, `status`, `marked_by`.
- **Exam / Result**: `id`, `title`, `marks_obtained`, `grade`, etc.
- **Fee**: `id`, `student_id`, `amount`, `status`.
- **Timetable**: `id`, `subject_id`, `teacher_id`, `day`, `start_time`, `end_time`.
- **Document**: `id`, `title`, `file`, `uploaded_by`.

## Folder Structure
- `/backend`: Django project.
- `/frontend`: Next.js application.
- `/face-service`: FastAPI microservice.
