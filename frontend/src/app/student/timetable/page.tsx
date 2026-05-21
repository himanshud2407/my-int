'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function StudentTimetable() {
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/timetable/')
            .then(res => setTimetable(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">My Class Schedule</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {loading ? (
                            <tr><td colSpan={4} className="px-6 py-4 text-center">Loading...</td></tr>
                        ) : timetable.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No classes scheduled.</td></tr>
                        ) : timetable.map((item: any) => (
                            <tr key={item.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{item.day}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.subject}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.start_time} - {item.end_time}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{item.room_number}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
