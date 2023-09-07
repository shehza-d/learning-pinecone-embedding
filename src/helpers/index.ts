import OpenAI from "openai";
import { OPEN_AI_KEY } from "../config/index.mjs";

export const getVectorByEmbeddings = async (text: string) => {
  try {
    const openai = new OpenAI({
      apiKey: OPEN_AI_KEY,
    });

    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    const vector = response?.data[0]?.embedding;

    return vector;
  } catch (err: any) {
    console.log("🚀 ~ file: index.ts:7 ~ getVectorByEmbeddings ~ err:", err);
    throw Error(
      err.message || "Error occurred while creating embeddings from OpenAI"
    );
  }
};
