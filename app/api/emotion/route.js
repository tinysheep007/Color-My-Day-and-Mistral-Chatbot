import { NextResponse } from "next/server";

// set up inference API
import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN)

// route that 
export async function POST(req) {
    // grab the input variable from axios POST 
    const { input } = await req.json();
    // get the acutal API result from getEmotion(input)
    const result = await getEmotion(input);
    // by defaulty I only take top 5 for the slices results
    const slicedRes = result.slice(0, 5);

    return NextResponse.json({message:"sccuess", 
        code: process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN,
        result,
        slicedRes
    })
}

// function that acutally call the hugging face API 
async function getEmotion(input){

    // get the result from hugging face API
    const result = await hf.textClassification({
        model: 'SamLowe/roberta-base-go_emotions',
        inputs: input
      })
    
    // console.log(result)
    
    return result
}

