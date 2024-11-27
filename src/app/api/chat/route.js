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

    // console.log(completion.choices[0].message)

    return Response.json({message:completion.choices[0].message});
}


// update chat history
// user id, assignment id, question id, chat history object


// chatRecord = role + message

// chatRecords( chatRecord )
//    check if user id, assignment id, question id already exists
//    if doesn't exist, create a new row
//    chatRecords column -> contains singular chatRecord
//    if it exists, append 



// rule
// smth that makes api call -> should be abstracted away & server side
// api calls never exposed to frontend!!!
// frontend (client side) should never make api calls to an api that you don't control
// "use client" -> static/dynamic html; no api calls
// security reasons; inspect

// server side
// functions that define routes
// route.ts = server side file that contains a bunch of routes
    // goes under sub folder
// ex. user > route.ts > getUser
// ex. chatHistory > route.ts > getChatHistory 