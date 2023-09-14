import { IPost } from "../types/index.js";
import { db } from "../db/index.mjs";
import type { Request, Response } from "express";
import { getEmbeddings } from "../helpers/getEmbeddings.js";
import { v4 as uuid } from "uuid";
import { vectorOfEmptyString } from "../data/index.js";
// import { PINECONE_NAME_SPACE } from "../config/index.mjs";
// PINECONE_NAME_SPACE is not available in pinecone free version

const getAllStories = async (req: Request, res: Response) => {
  const { search } = req?.query;
  const queryText: any = search || ""; // empty string to fetch all data

  // Pagination
  const from = 0;
  const to = 100;

  const id = uuid();

  let query;
  try {
    if (queryText) {
      const { vector } = await getEmbeddings(queryText);
      // find by id like document db or find by vector
      query = {
        vector,
        // id,
        topK: to,
        includeValues: false,
        includeMetadata: true,
        // namespace: PINECONE_NAME_SPACE,
      };
    } else {
      const vector = vectorOfEmptyString;
      query = {
        vector,
        topK: 100,
        includeValues: false,
        includeMetadata: true,
      };
    }

    const queryResponse = await db.query(query);
    console.log(
      "🚀crudControllers.ts:28 getAllStories queryResponse:",
      queryResponse
    );

    if (!queryResponse?.matches?.length) {
      res.status(404).send({ message: "Data Not Found" });
      return;
    }

    res.status(200).send({
      message: "All Products fetched",
      queryResponse: queryResponse.matches,
      id,
    });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const addStory = async (req: Request, res: Response) => {
  const { title, text } = req.body;

  // Validation
  if (
    !title ||
    !text ||
    typeof title !== "string" ||
    typeof text !== "string"
  ) {
    res.status(403).send(parameterMissing);
    return;
  }

  try {
    const id = uuid();
    const queryText = `${title} ${text}`;
    const { vector, usage } = await getEmbeddings(queryText);

    const upsertRequest = {
      id,
      values: vector,
      metadata: { id, title, text },
      // namespace: //PINECONE_NAME_SPACE,
    };

    const upsertResponse = await db.upsert([upsertRequest]);
    console.log("upsertResponse: ", upsertResponse);

    res.status(201).send({
      message: "New Data Created!",
      usage,
      data: {
        id,
        title,
        text,
      },
      createdOn: `${new Date()}`,
    });
  } catch (err: any) {
    console.log("🚀 ~ file: crudControllers.ts:118 ~ addStory ~ err:", err);
    res.status(500).send({
      message: err.message || "Failed to create story, please try later",
    });
  }
};

const updateStory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, text } = req.body;

  // Validation
  if (
    !title ||
    !text ||
    typeof title !== "string" ||
    typeof text !== "string"
  ) {
    res.status(403).send(parameterMissing);
    return;
  }

  let product: Partial<IPost> = {};

  text && (product.text = text);
  title && (product.title = title);

  try {
    const queryText = `${title} ${text}`;
    const { vector, usage } = await getEmbeddings(queryText);

    const upsertRequest = {
      id,
      values: vector,
      metadata: { id, title, text },
    };

    const upsertResponse = await db.update(upsertRequest);
    console.log("upsertResponse: ", upsertResponse);

    res
      .status(201)
      .send({ message: "Product updated", usage, data: { id, title, text } });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const deleteStory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deleteResponse = await db.deleteOne(id);
    console.log(
      "🚀 ~ file: crudControllers.ts:157 ~ deleteStory ~ deleteResponse:",
      deleteResponse
    );

    // if (!deleteResponse) {
    //   throw new Error("No documents matched the query. Deleted 0 documents.");
    // }

    res.status(201).send({ message: "Successfully deleted one document.", id });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const deleteAllStory = async (req: Request, res: Response) => {
  try {
    const deleteResponse = await db.deleteAll();
    console.log("🚀176 ~ deleteAllStory ~ deleteResponse:", deleteResponse);
    res.status(201).send({ message: "Successfully deleted All documents." });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

const parameterMissing = {
  message: `Required parameter missing. At-least one parameter is required from title or text to complete update.`,
  exampleRequest: {
    title: "hello",
    text: "this is some example text",
  },
};

export { getAllStories, addStory, updateStory, deleteStory, deleteAllStory };

// kya ak db ma normal data aur vector at the same time aasagta hy??
