import { NextResponse } from "next/server";

import { HfInference } from '@huggingface/inference'

const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN)

export async function POST(req) {
    const { input } = await req.json();
    const result = await getEmotion(input);
    const slicedRes = result.slice(0, 5);

    return NextResponse.json({message:"sccuess", 
        code: process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN,
        result,
        slicedRes
    })
}

async function getEmotion(input){
    if(!hf){
        const hf = new HfInference(process.env.NEXT_PUBLIC_HUGGINGFACE_TOKEN)
    }
    const result = await hf.textClassification({
        model: 'SamLowe/roberta-base-go_emotions',
        inputs: input
      })
    
    console.log(result)

    return result
}

