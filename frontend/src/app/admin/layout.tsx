import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <aside className="w-64 bg-slate-800 text-white p-6">
                <h2 className="text-xl font-bold mb-8">Admin Dashboard</h2>
                <nav className="space-y-4">
                    <Link href="/admin" className="block hover:text-blue-300">Overview</Link>
                    <Link href="/admin/students" className="block hover:text-blue-300">Manage Students</Link>
                    <Link href="/admin/teachers" className="block hover:text-blue-300">Manage Teachers</Link>
                    <Link href="/admin/attendance" className="block hover:text-blue-300">Attendance Reports</Link>
                    <Link href="/admin/timetable" className="block hover:text-blue-300">Timetable</Link>
                    <Link href="/admin/fees" className="block hover:text-blue-300">Fees Management</Link>
                    <Link href="/admin/documents" className="block hover:text-blue-300">Documents</Link>
                </nav>
            </aside>
            <main className="flex-1 p-8">
                {children}
            </main>
        </div>
    );
}
