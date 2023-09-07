import { PineconeClient } from "@pinecone-database/pinecone";
import {
  PINECONE_API_KEY,
  PINECONE_ENVIRONMENT,
  PINECONE_INDEX_NAME,
} from "../config/index.mjs";
import type { VectorOperationsApi } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/index.js";

let index: VectorOperationsApi;
try {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: PINECONE_ENVIRONMENT!,
    apiKey: PINECONE_API_KEY!,
  });
  index = pinecone.Index(PINECONE_INDEX_NAME!);
} catch (err) {
  console.log("🚀 ~ file: db.ts:16 ~ err:", err);
}
export { index as db };

// finally {
//   // Ensures that the client will close when you finish/error
//   await client.close(); }
