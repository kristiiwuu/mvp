import { NextResponse } from 'next/server';
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { OpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { StructuredOutputParser } from "langchain/output_parsers";
import * as z from "zod";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const pdfFile = formData.get('pdf');

        if (!pdfFile) {
            return NextResponse.json(
                { error: 'No PDF file provided' },
                { status: 400 }
            );
        }

        // Convert the file to a Buffer
        const buffer = Buffer.from(await pdfFile.arrayBuffer());

        // Load and parse the PDF
        const loader = new PDFLoader(new Blob([buffer]));
        const docs = await loader.load();
        const pdfText = docs.map(doc => doc.pageContent).join(' ');

        const questionSchema = z.object({
            question: z.string(),
            answer: z.string(),
            hints: z.array(z.string()),
        });

        const questionsArraySchema = z.array(questionSchema);

        const parser = StructuredOutputParser.fromZodSchema(questionsArraySchema);

        const maxChars = 1500;
        const truncatedText = pdfText.slice(0, maxChars) + (pdfText.length > maxChars ? '...' : '');

        const promptTemplate = `
        {format_instructions}
        No other text, no numbers, no explanations.
        Analyze: {text}
        `;

        const formatInstructions = parser.getFormatInstructions();

        const openAI = new OpenAI({ 
            openAIApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
            temperature: 0.7,
        });

        const prompt = promptTemplate
            .replace('{format_instructions}', formatInstructions)
            .replace('{text}', truncatedText);

        const aiResponse = await openAI.complete({
            prompt,
            maxTokens: 1500,
        });

        let parsedResponse;
        try {
            parsedResponse = await parser.parse(aiResponse.choices[0].text);
        } catch (parseError) {
            console.error('Parsing error:', parseError);
            return NextResponse.json(
                { error: 'Invalid response format from AI' },
                { status: 500 }
            );
        }

        return NextResponse.json({ questions: parsedResponse });

    } catch (error) {
        console.error('PDF parsing error:', error);
        return NextResponse.json(
            { error: 'Error processing PDF' },
            { status: 500 }
        );
    }
}