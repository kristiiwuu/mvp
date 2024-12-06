import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assuming you're using Prisma

export async function POST(request) {
    try {
        const { questions } = await request.json();

        // Save questions to your database
        const savedQuestions = await prisma.question.createMany({
            data: questions.map(q => ({
                question: q.question,
                answer: q.answer,
                hints: q.hints,
            })),
        });

        return NextResponse.json({ success: true, questions: savedQuestions });
    } catch (error) {
        console.error('Error saving questions:', error);
        return NextResponse.json(
            { error: 'Error saving questions' },
            { status: 500 }
        );
    }
} 