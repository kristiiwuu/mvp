import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { StructuredOutputParser } from "langchain/output_parsers";
import * as z from "zod";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  temperature: 0.7,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const pdfFile = formData.get("pdf");

    if (!pdfFile) {
      return NextResponse.json(
        { error: "No PDF file provided" },
        { status: 400 }
      );
    }

    // Convert the file to a Buffer
    const buffer = Buffer.from(await pdfFile.arrayBuffer());

    // Load and parse the PDF
    const loader = new PDFLoader(new Blob([buffer]));
    const docs = await loader.load();
    const pdfText = docs.map((doc) => doc.pageContent).join(" ");

    const questionSchema = z.object({
      question: z.string(),
      answer: z.string(),
      hints: z.array(z.string()),
    });

    const questionsArraySchema = z.array(questionSchema);

    const promptTemplate = `Please generate review questions using the provided input. No other text, no numbers, no explanations.\n\nAnalyze:\n\`\`\`${pdfText}\`\`\``;

    const completion = await openai.beta.chat.completions.parse({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: promptTemplate }],
      response_format: zodResponseFormat(
        z.object({ questions: questionsArraySchema }),
        "questions"
      ),
    });

    const questions = completion.choices[0].message.parsed;

    return NextResponse.json({ questions });
  } catch (error) {
    console.error("PDF parsing error:", error);
    return NextResponse.json(
      { error: "Error processing PDF" },
      { status: 500 }
    );
  }
}
