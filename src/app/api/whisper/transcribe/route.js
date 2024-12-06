import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get("audio");

    if (!audioFile) {
      return NextResponse.json(
        { error: "No audio file provided" },
        { status: 400 }
      );
    }

    // Convert the audio file to a Buffer
    const buffer = Buffer.from(await audioFile.arrayBuffer());

    const response = await openai.audio.transcriptions.create({
      file: new File([buffer], "audio.wav", { type: "audio/wav" }),
      model: "whisper-1",
    });

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Whisper API Error:", error);
    return NextResponse.json(
      { error: "Error transcribing audio" },
      { status: 500 }
    );
  }
}
