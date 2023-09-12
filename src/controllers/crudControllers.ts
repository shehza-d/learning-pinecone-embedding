// import { IProduct } from "../types/index.js";
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
  const to = 0;

  const id = uuid();

  let query;
  try {
    if (queryText) {
      const { vector } = await getEmbeddings(queryText);
      // find by id like document db or find by vector
      query = {
        vector,
        // id,
        topK: 100,
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

    // res.send(queryResponse.matches);

    // if (!queryResponse.matches.length) {
    //   res.status(404).send({ message: "Products Not Found" });
    //   return;
    // }
    res.status(200).send({
      message: "All Products fetched",
      queryResponse: queryResponse.matches,
      id,
    });
  } catch (err: any) {
    res.status(500).send({ message: err.message || "Unknown Error" });
  }
};

// const getProduct = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!ObjectId.isValid(id)) {
//     res.status(403).send({ message: "Incorrect product id" });
//     return;
//   }

//   try {
//     const query = { _id: new ObjectId(id) };

//     const products = db.collection<IProduct>("products");
//     const data = await products.findOne<IProduct>(query);

//     if (!data) throw Error("Product Not Found!");

//     res.send({ message: "Product found", data });
//   } catch (err: any) {
//     res.status(500).send({ message: err.message || "Unknown Error" });
//   }
// };

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
      message: "New Story Created!",
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

// const updateStory = async (req: Request, res: Response) => {
//   const { id, name, description } = req.body;
//   const price = Number(req.body.price);

//   // Validation
//   if (!ObjectId.isValid(id)) {
//     res.status(403).send({ message: "Incorrect product id" });
//     return;
//   }
//   if ((!name && !price && !description) || !id) {
//     res.status(403).send(parameterMissing);
//     return;
//   }

//   if (price && isNaN(price)) {
//     res.status(403).send("Price missing");
//     return;
//   }
//   if (name && typeof name !== "string") {
//     res.status(403).send("NAME  missing");
//     return;
//   }
//   if (description && typeof description !== "string") {
//     res.status(403).send("description missing");
//     return;
//   }

//   let product: Partial<IProduct> = {};

//   name && (product.name = name);
//   price && (product.price = price);
//   description && (product.description = description);

//   try {
//     const products = db.collection<IProduct>("products");
//     const filter = { _id: new ObjectId(id) };
//     const updateDoc = { $set: product };
//     const data = await products.updateOne(filter, updateDoc);

//     if (!data.matchedCount) throw Error("Product Not Found!");

//     res.status(201).send({ message: "Product updated" });
//   } catch (err: any) {
//     res.status(500).send({ message: err.message || "Unknown Error" });
//   }
// };

// const deleteStory = async (req: Request, res: Response) => {
//   const { id } = req.params;

//   if (!ObjectId.isValid(id)) {
//     res.status(403).send({ message: "Incorrect product id" });
//     return;
//   }
//   try {
//     const products = db.collection<IProduct>("products");
//     const query = { _id: new ObjectId(id) };
//     const result = await products.deleteOne(query);

//     if (!result.deletedCount)
//       throw new Error("No documents matched the query. Deleted 0 documents.");

//     res.status(201).send({ message: "Successfully deleted one document." });
//   } catch (err: any) {
//     res.status(500).send({ message: err.message || "Unknown Error" });
//   }
// };

const parameterMissing = {
  message: `Required parameter missing. At-least one parameter is required from title or text to complete update.`,
  exampleRequest: {
    title: "hello",
    text: "this is some example text",
  },
};

// const addStory = () => {};
const updateStory = () => {};
const deleteStory = () => {};
export { getAllStories, addStory, updateStory, deleteStory };
