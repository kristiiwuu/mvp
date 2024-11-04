import { NextResponse } from 'next/server'
import * as pdfjsLib from 'pdfjs-dist'

export async function POST(req: Request) {
  const data = await req.formData()
  const file: File | null = data.get('pdf') as unknown as File

  if (!file) {
    return NextResponse.json({ success: false })
  }

  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise
  let fullText = ''

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()
    const pageText = textContent.items.map((item: any) => item.str).join(' ')
    fullText += pageText + '\n'
  }

  // Here you could implement more sophisticated parsing to extract questions and answers

  return NextResponse.json({ success: true, text: fullText })
}