'use server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

//export const runtime = 'edge';
export async function POST(req, res) {
    const { messages } = await req.json();

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: false,
        messages: messages,
        temperature: 1
    });

    console.log(completion.choices[0].message)

    return Response.json({message:completion.choices[0].message});
}
