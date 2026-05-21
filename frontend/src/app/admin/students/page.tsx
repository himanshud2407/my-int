'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function ManageStudents() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/students/')
            .then(res => setStudents(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Manage Students</h1>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Student
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : students.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No students found.</td></tr>
                        ) : students.map((student: any) => (
                            <tr key={student.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{student.user_details?.username}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{student.roll_number}</td>
                                <td className="px-6 py-4 whitespace-nowrap">Computer Science</td>
                                <td className="px-6 py-4 whitespace-nowrap text-blue-600 hover:underline cursor-pointer">Edit</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
