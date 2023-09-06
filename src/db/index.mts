// import { MongoClient, type Db } from "mongodb";
// import { MONGO_URI, DB_NAME } from "../config/index.mjs";

import { PineconeClient } from "@pinecone-database/pinecone";

try {
  const pinecone = new PineconeClient();
  await pinecone.init({
    environment: "gcp-starter",
    apiKey: "7785df84-42e8-4416-a415-6ca9ed9d6da4",
  });
  const index = pinecone.Index("hello-world");
} catch (err) {
  console.log("🚀 ~ file: db.ts:16 ~ err:", err);
}
// export { database as db };

// "dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/server.mjs\"",

// finally {
//   // Ensures that the client will close when you finish/error
//   await client.close(); }
