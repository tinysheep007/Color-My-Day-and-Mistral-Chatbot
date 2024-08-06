import { NextResponse } from "next/server";

import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN)


export async function POST(req){

  const { userMessage } = await req.json();

  const response = await hf.textGeneration({
    model: 'mistralai/Mistral-Nemo-Instruct-2407',
    inputs: userMessage
  })
  
  const reply = response.generated_text
  // console.log(response.generated_text)

  return NextResponse.json({message:"success", reply})
}