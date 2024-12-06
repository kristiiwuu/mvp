'use client';
import PDFUpload from '../components/Teacher-Side/PDFUpload';
import HappyDuey from 'public/happy-duey.svg'

export default function PDFParserPage() {
    return (
        <div className="min-h-screen bg-[#F8F7F4] py-12 px-6">
            <div className="mx-auto flex flex-col justify-center items-center">
                <h1 className="text-3xl font-semibold text-center mb-8 text-[#1F8FBF]">
                    Homework Assignment Generator
                </h1>
                <PDFUpload />
                <HappyDuey className="scale-75 "/>
            </div>
        </div>
    );
} 