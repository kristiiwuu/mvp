'use server';

import OpenAI from 'openai';
import { StreamingTextResponse, OpenAIStream } from 'ai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

//export const runtime = 'edge';
export async function POST(req, res) {
    const { messages } = await req.json();
    console.log('messages: ', messages);

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: false,
        messages: messages,
        temperature: 1
    });

    console.log(completion.choices[0].message)

    return Response.json({message:completion.choices[0].message});
    /*
    const response = await openai.chat.completions.create(
    {
        model: 'gpt-3.5-turbo',
        stream: true,
        messages: [
            {
                role: 'system',
                content: "You are a middle school teacher. You address people as your students. You always reply with guiding questions and never directly give the correct answer. Your replies are under 500 characters. Make sure to only say the student’s answer is correct if they get it 80% right. Once the student’s answer is deemed correct you can stop replying until further prompting."
            },
            ...messages,
        ],
        stream: true,
        temperature: 1
    });
    */

    const stream = OpenAIStream(completion);
    return new StreamingTextResponse(stream);
}
