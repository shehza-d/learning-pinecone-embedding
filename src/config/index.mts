// npm i dotenv
import "dotenv/config";

if (
    !process.env.PINECONE_INDEX_NAME
    || !process.env.OPENAI_API_KEY) {
    throw new Error('Missing env variables');
}
console.log("configuration completed");

const PORT = process.env.PORT || 3003;
// const DB_NAME = process.env.DB_NAME;
// const DB_USERNAME = process.env.DB_USERNAME || "shehzad";
// const DB_PASSWORD = process.env.DB_PASSWORD;
// const DB_CLUSTER = process.env.DB_CLUSTER;
// const SECRET = process.env.SECRET;
// const MONGO_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

// OPENAI_API_KEY
// PINECONE_API_KEY
// PINECONE_ENVIRONMENT
// PINECONE_INDEX_NAME
// PINECONE_NAME_SPACE

export { PORT };
