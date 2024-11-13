import OpenAI from 'openai';
import {OpenAIStream, StreamingTextResponse} from 'ai';

const openai = new OpenAI({
    apiKey: process.env.API_KEY,
});

export const runtime = 'edge';
export async function POST(req, res) {
    const { messages } = await req.json();
    console.log('messages: ', messages);

    const response = await openai.chat.completions.create(
    {
        model: 'gpt-4o-mini',
        stream: true,
        messages: [
            {
                role: 'system',
                content: "You are a middle school teacher. You address people as your students. You always reply with guiding questions and never directly give the correct answer." 
                    + "Your replies are under 500 characters. Make sure to only say the student’s answer is correct if they get it 80% right."
                    + "Once the student’s answer is deemed correct you can stop replying until further prompting."
            },
            ...messages,
        ],
        stream: true,
        temperature: 1
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
}
