'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PDFUpload() {
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile?.type === 'application/pdf') {
            setFile(selectedFile);
            setError(null);
        } else {
            setError('Please upload a PDF file');
            setFile(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('pdf', file);

        try {
            const response = await fetch('/api/parse-pdf', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload PDF');
            }

            const data = await response.json();
            console.log('Generated questions:', data.questions);
            
            // Navigate to populated assignment page after successful generation
            router.push('/assignment/populated_assignment');
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-custom border-2 border-[#B8B7AF]">
            <div className="flex flex-col gap-4">
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="border p-2 rounded"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                    onClick={handleUpload}
                    disabled={!file || loading}
                    className={`${
                        !file || loading 
                            ? 'bg-gray-300' 
                            : 'bg-[#1F8FBF] hover:bg-[#58B6DF]'
                    } text-white px-4 py-2 rounded`}
                >
                    {loading ? 'Processing...' : 'Generate Questions'}
                </button>
            </div>
        </div>
    );
} 