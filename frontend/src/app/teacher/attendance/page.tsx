'use client';
import { useState, useEffect } from 'react';
import CameraUI from '@/components/CameraUI';
import api from '@/lib/api';
import axios from 'axios';

// Pull from environment variable
const FACE_SERVICE_URL = process.env.NEXT_PUBLIC_FACE_SERVICE_URL || 'http://localhost:8001';

export default function MarkAttendance() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState<any>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        api.get('/students/').then(res => setStudents(res.data));
    }, []);

    const handleCapture = async (base64Image: string) => {
        if (!selectedStudent) {
            setMessage('Please select a student first');
            return;
        }

        setIsProcessing(true);
        setMessage('Verifying face...');

        try {
            const embRes = await api.get(`/face-embeddings/?student=${selectedStudent.id}`);
            if (embRes.data.length === 0) {
                setMessage('No face registered for this student');
                setIsProcessing(false);
                return;
            }
            const storedEmbedding = embRes.data[0].embedding;

            const verifyRes = await axios.post(`${FACE_SERVICE_URL}/verify`, {
                image: base64Image,
                stored_embedding: storedEmbedding
            });

            if (verifyRes.data.match) {
                await api.post('/attendance/', {
                    student: selectedStudent.id,
                    date: new Date().toISOString().split('T')[0],
                    status: 'Present',
                    marked_by: 'FaceRec'
                });
                setMessage('Attendance marked successfully! ✅');
            } else {
                setMessage('Face does not match! ❌');
            }
        } catch (err: any) {
            console.error(err);
            setMessage('Verification failed or service unavailable');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Mark Attendance (Biometric)</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Student</label>
                    <select
                        className="w-full p-2 border rounded mb-4 shadow-sm"
                        onChange={(e) => setSelectedStudent(students.find((s: any) => s.id === parseInt(e.target.value)))}
                    >
                        <option value="">Choose a student...</option>
                        {students.map((s: any) => (
                            <option key={s.id} value={s.id}>{s.user_details?.username} ({s.roll_number})</option>
                        ))}
                    </select>
                    {message && (
                        <div className={`p-4 rounded-lg shadow-sm ${message.includes('successfully') ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                            {message}
                        </div>
                    )}
                </div>
                <div className="bg-white p-2 rounded-xl shadow-lg border border-gray-100">
                    <CameraUI onCapture={handleCapture} isProcessing={isProcessing} />
                </div>
            </div>
        </div>
    );
}
