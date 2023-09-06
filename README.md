# Pinecone crud

Pinecone Vector Database hello world - A small curd app

- We can create embeddings not only with OpenAI but also using other methods.
- OpenAI's embeddings are considered the best standard.
- OpenAI's embeddings are of the highest quality.
- An "upsert" is like a database action that updates a row if a specific value is already there in a table. If the value isn't there, it adds a new row.
- You can't turn a vector back into text easily.
- In Pinecone, a "database" is the same as an "index."
- Think of "namespace" as a fancy word for "collection."

## Embeddings

### [What are embeddings?](https://platform.openai.com/docs/guides/embeddings/what-are-embeddings)

An embedding is a vector representation of a piece of data (e.g. some text) that is meant to preserve aspects of its content and/or its meaning. Chunks of data that are similar in some way will tend to have embeddings that are closer together than unrelated data. OpenAI offers text embedding models that take as input a text string and produce as output an embedding vector. Embeddings are useful for search, clustering, recommendations, anomaly detection, classification, and more. Read more about embeddings in our embeddings guide.

An embedding is a relatively low-dimensional space into which you can translate high-dimensional vectors. Embeddings make it easier to do machine learning on large inputs like sparse vectors representing words

## Tokens

GPT and embeddings models process text in chunks called tokens. Tokens represent commonly occurring sequences of characters. For example, the string " tokenization" is decomposed as " token" and "ization", while a short and common word like " the" is represented as a single token. Note that in a sentence, the first token of each word typically starts with a space character. Check out our tokenizer tool to test specific strings and see how they are translated into tokens. As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words for English text.

One limitation to keep in mind is that for a GPT model the prompt and the generated output combined must be no more than the model's maximum context length. For embeddings models (which do not output tokens), the input must be shorter than the model's maximum context length. The maximum context lengths for each GPT and embeddings model can be found in the model index.
