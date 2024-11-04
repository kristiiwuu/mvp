import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful tutor. Your goal is to guide students towards the correct answer using only questions and hints. Never provide the direct answer. If a student is stuck, break down the problem into smaller steps and ask guiding questions."
      },
      ...messages
    ],
  })

  return NextResponse.json({ message: completion.choices[0].message.content })
}