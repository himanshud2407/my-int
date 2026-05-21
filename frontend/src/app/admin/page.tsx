'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminOverview() {
    const [stats, setStats] = useState({
        students: 0,
        teachers: 0,
        attendance: '0%'
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [studentsRes, teachersRes, attendanceRes] = await Promise.all([
                    api.get('/students/'),
                    api.get('/teachers/'),
                    api.get('/attendance/')
                ]);

                const totalStudents = studentsRes.data.length;
                const totalTeachers = teachersRes.data.length;

                // Simplified attendance percentage for today
                const today = new Date().toISOString().split('T')[0];
                const todayAttendance = attendanceRes.data.filter((a: any) => a.date === today);
                const attendancePct = totalStudents > 0
                    ? Math.round((todayAttendance.filter((a: any) => a.status === 'Present').length / totalStudents) * 100)
                    : 0;

                setStats({
                    students: totalStudents,
                    teachers: totalTeachers,
                    attendance: `${attendancePct}%`
                });
            } catch (err) {
                console.error("Failed to fetch dashboard stats", err);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Institute Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm font-medium">Total Students</h3>
                    <p className="text-2xl font-bold">{stats.students}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm font-medium">Active Teachers</h3>
                    <p className="text-2xl font-bold">{stats.teachers}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow border-l-4 border-yellow-500">
                    <h3 className="text-gray-500 text-sm font-medium">Today's Attendance</h3>
                    <p className="text-2xl font-bold">{stats.attendance}</p>
                </div>
            </div>
        </div>
    );
}
