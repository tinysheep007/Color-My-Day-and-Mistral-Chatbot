import { NextResponse } from "next/server";

// set up inference API based on hugging face documentation
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN)


export async function POST(req){
  //get the userMessage varaible from POST.body in axios POST
  const { userMessage } = await req.json();

  // call hugging face API to get response
  const response = await hf.textGeneration({
    model: 'mistralai/Mistral-Nemo-Instruct-2407',
    inputs: userMessage
  })
  
  //get the response
  const reply = response.generated_text
  // console.log(response.generated_text)

  // return response to front end
  return NextResponse.json({message:"success", reply})
}