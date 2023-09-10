import { Pinecone } from "@pinecone-database/pinecone";
import type { Index, RecordMetadata } from "@pinecone-database/pinecone";
import {
  PINECONE_API_KEY,
  PINECONE_ENVIRONMENT,
  PINECONE_INDEX_NAME,
} from "../config/index.mjs";

let index: Index<RecordMetadata>;
try {
  const pinecone = new Pinecone({
    apiKey: PINECONE_API_KEY!,
    environment: PINECONE_ENVIRONMENT!,
  });
  index = pinecone.Index(PINECONE_INDEX_NAME!);
} catch (err) {
  console.error("🚀 ~ file: db.ts:16 ~ err:", err);
}
export { index as db };

// finally {
//   // Ensures that the client will close when you finish/error
//   await client.close(); }
