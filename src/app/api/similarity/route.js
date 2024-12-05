'use server';
import { OpenAI } from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY
});

export async function POST(req) {
    try {
        const { selected_answer, user_input } = await req.json();

        // Get embeddings for both texts
        const [answerEmbedding, userEmbedding] = await Promise.all([
            openai.embeddings.create({
                model: "text-embedding-3-small",
                input: selected_answer,
                encoding_format: "float",
            }),
            openai.embeddings.create({
                model: "text-embedding-3-small",
                input: user_input,
                encoding_format: "float",
            })
        ]);

        // Calculate cosine similarity
        const similarity = calculateCosineSimilarity(
            answerEmbedding.data[0].embedding,
            userEmbedding.data[0].embedding
        );

        return NextResponse.json({ similarity });
    } catch (error) {
        console.error('Similarity calculation error:', error);
        return NextResponse.json({ error: 'Error calculating similarity' }, { status: 500 });
    }
}

function calculateCosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((acc, val, i) => acc + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((acc, val) => acc + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (mag1 * mag2);
}