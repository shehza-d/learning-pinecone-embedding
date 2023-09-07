// npm i dotenv
import "dotenv/config";

const PORT = process.env.PORT || 3003;
const OPEN_AI_KEY = process.env.OPEN_AI_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_ENVIRONMENT = process.env.PINECONE_ENVIRONMENT;
const PINECONE_INDEX_NAME = process.env.PINECONE_INDEX_NAME;
const PINECONE_NAME_SPACE = process.env.PINECONE_NAME_SPACE;

if (!process.env.PINECONE_INDEX_NAME || !process.env.OPEN_AI_KEY) {
  throw new Error("Missing env variables");
}
console.log("configuration completed");

export {
  PORT,
  OPEN_AI_KEY,
  PINECONE_API_KEY,
  PINECONE_ENVIRONMENT,
  PINECONE_INDEX_NAME,
  PINECONE_NAME_SPACE,
};
