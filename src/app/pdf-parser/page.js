'use client';
import PDFUpload from '../components/Teacher-Side/PDFUpload';

export default function PDFParserPage() {
    return (
        <div className="min-h-screen bg-[#F8F7F4] py-12 px-4">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center mb-8 text-[#226387]">
                    Homework Assignment Generator
                </h1>
                <PDFUpload />
            </div>
        </div>
    );
} 