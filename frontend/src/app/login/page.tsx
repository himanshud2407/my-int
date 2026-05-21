'use client';
import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login/', { username, password });
            setCookie('access_token', response.data.access);
            setCookie('refresh_token', response.data.refresh);

            const userRes = await api.get('/auth/me/');
            const user = userRes.data;

            if (user.role === 'super_admin') router.push('/admin');
            else if (user.role === 'teacher') router.push('/teacher');
            else router.push('/student');

        } catch (err: any) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-8 bg-white shadow-lg rounded-lg w-96">
                <h1 className="text-2xl font-bold mb-6 text-center">IMS Login</h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        className="w-full p-2 mb-4 border rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-2 mb-6 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
