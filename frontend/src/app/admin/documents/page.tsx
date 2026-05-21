'use client';
import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function AdminDocuments() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const fetchDocs = () => {
        api.get('/documents/')
            .then(res => setDocuments(res.data))
            .catch(err => console.error(err))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchDocs();
    }, []);

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);

        try {
            await api.post('/documents/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setTitle('');
            setFile(null);
            fetchDocs();
        } catch (err) {
            console.error("Upload failed", err);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Document Management</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <form onSubmit={handleUpload} className="mb-8 p-4 border rounded bg-gray-50">
                    <h3 className="font-bold mb-4">Upload New Document</h3>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Document Title"
                            className="w-full p-2 border rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                            required
                        />
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                        >
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                </form>
                <div className="space-y-4">
                    {loading ? <p>Loading documents...</p> : documents.map((doc: any) => (
                        <div key={doc.id} className="flex justify-between items-center p-4 border rounded hover:bg-gray-50">
                            <div>
                                <p className="font-medium">{doc.title}</p>
                                <p className="text-sm text-gray-500">{new Date(doc.uploaded_at).toLocaleString()}</p>
                            </div>
                            <a href={doc.file} target="_blank" className="text-blue-600 hover:underline font-medium">Download</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
