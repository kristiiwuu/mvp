'use server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

function cosinesim(A, B) {
    var dotproduct = 0;
    var mA = 0;
    var mB = 0;

    for(var i = 0; i < A.length; i++) {
        dotproduct += A[i] * B[i];
        mA += A[i] * A[i];
        mB += B[i] * B[i];
    }

    mA = Math.sqrt(mA);
    mB = Math.sqrt(mB);
    var similarity = dotproduct / (mA * mB);

    return similarity;
}

export async function POST(req, res) {

    const { selected_answer, user_input } = await req.json();
    // const { selected_answer } = await req.json();

    console.log(user_input)
    console.log(selected_answer);

    // return new Response(null, { status: 200 });

    const user_input_embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: user_input,
        encoding_format: "float",
    });

    const answer_embedding = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: selected_answer,
        encoding_format: "float",
    });

    console.log(user_input_embedding)
    console.log(answer_embedding)

    const number = cosinesim(user_input_embedding.data[0].embedding, answer_embedding.data[0].embedding)
    console.log("cosinesim " + number)
    // similarity = cosinesim(user_input_embedding, answer_embedding);
    return new Response();
}