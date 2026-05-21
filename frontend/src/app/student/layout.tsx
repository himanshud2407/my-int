import Link from 'next/link';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-indigo-800 text-white p-6">
                <h2 className="text-xl font-bold mb-8">Student Portal</h2>
                <nav className="space-y-4">
                    <Link href="/student" className="block hover:text-indigo-300">My Profile</Link>
                    <Link href="/student/timetable" className="block hover:text-indigo-300">Class Schedule</Link>
                    <Link href="/student/attendance" className="block hover:text-indigo-300">My Attendance</Link>
                    <Link href="/student/results" className="block hover:text-indigo-300">View Results</Link>
                    <Link href="/student/fees" className="block hover:text-indigo-300">My Fees</Link>
                    <Link href="/student/documents" className="block hover:text-indigo-300">My Documents</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
