import Link from 'next/link';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-green-800 text-white p-6">
                <h2 className="text-xl font-bold mb-8">Teacher Dashboard</h2>
                <nav className="space-y-4">
                    <Link href="/teacher" className="block hover:text-green-300">Overview</Link>
                    <Link href="/teacher/timetable" className="block hover:text-green-300">My Timetable</Link>
                    <Link href="/teacher/attendance" className="block hover:text-green-300">Take Attendance</Link>
                    <Link href="/teacher/exams" className="block hover:text-green-300">Exams & Results</Link>
                    <Link href="/teacher/documents" className="block hover:text-green-300">Resources</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
