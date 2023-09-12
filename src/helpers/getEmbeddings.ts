import OpenAI from "openai";
import { OPEN_AI_KEY } from "../config/index.mjs";
import { cleanText } from "./textCleaning.js";

/**
 * Get text embeddings using the OpenAI API.
 * @param text - The input text for which embeddings are required.
 * @returns Promise<{vector: number[]}> - An containing the text embeddings and API usage details.
 * @throws Error if there's an issue with the API call or response.
 * @description
 * Embeddings
 * @async
 * converts text into vector
 * @returns A 1536 dimension vector number[]
 */

// since pine cone can only store data in vector form (numeric representation of text)
// we will have to convert text data into vector of a certain dimension (1536 in case of openai)

export const getEmbeddings = async (text: string) => {
  try {
    if (text.length > 250) throw new Error("Text is too long!!");
    text = cleanText(text);

    const openai = new OpenAI({ apiKey: OPEN_AI_KEY });

    const response = await openai.embeddings.create({
      model: "text-embedding-ada-002",
      input: text,
    });

    console.log("🚀 ~ getEmbeddings.ts:18 response:", response);

    if (!response?.data || response?.data?.length === 0)
      throw new Error("No embeddings data found in the API response.");

    const vector = response.data[0].embedding;

    return { vector, usage: response.usage };
  } catch (err: any) {
    console.error("🚀 ~ file: index.ts:7 ~ getVectorByEmbeddings ~ err:", err);
    throw new Error(
      err.message || "An error occurred while creating embeddings from OpenAI."
    );
  }
};

// example to call this function
// const { vector } = await getEmbeddings("");
