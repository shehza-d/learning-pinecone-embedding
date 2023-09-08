// import { IProduct } from "../types/index.js";
import { db } from "../db/index.mjs";
import type { Request, Response } from "express";
import { getVectorByEmbeddings } from "../helpers/index.js";
import { v4 as uuid } from "uuid";
import { PINECONE_NAME_SPACE } from "../config/index.mjs";

const getAllStories = async (req: Request, res: Response) => {
  console.log(
    "🚀 ~ file: productControllers.ts:7 ~ getAllProducts ~ req:",
    req.body
  );
  const queryText = "retreated";

  try {
    const id = uuid();
    const vector = await getVectorByEmbeddings(queryText);

    // find by id like document db or find by vector
    const queryResponse = await db.query({
      queryRequest: {
        vector: vector,
        // id,
        topK: 100,
        includeValues: false,
        includeMetadata: true,
        // namespace: PINECONE_NAME_SPACE,
      },
    });

    console.log(
      "🚀 ~ file: crudControllers.ts:28 ~ getAllStories ~ queryResponse:",
      queryResponse
    );

    // queryResponse?.matches?.map(eachMatch => {
    //   console.log(`score ${eachMatch.score.toFixed(1)} => ${JSON.stringify(eachMatch.metadata)}\n\n`);
    // })
    // console.log(`${queryResponse.matches.length} records found `);

    // res.send(queryResponse.matches);

    // if (!data.length) {
    //   res.status(404).send({ message: "Products Not Found" });
    //   return;
    // }
    const data = "";
    res.status(200).send({
      message: "All Products fetched",
      data,
      queryResponse: queryResponse.matches,
      vector,
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
    const vector = await getVectorByEmbeddings(queryText);

    const upsertRequest = {
      vectors: [
        {
          id,
          values: vector,
          metadata: { title, text },
        },
      ],
      // namespace: 'aa'//PINECONE_NAME_SPACE,
    };

    const upsertResponse = await db.upsert({ upsertRequest });
    console.log("upsertResponse: ", upsertResponse);

    res.status(201).send({
      message: "New Story Created!",
      id,
    });
  } catch (err: any) {
    console.log("🚀 ~ file: crudControllers.ts:118 ~ addStory ~ err:", err);
    res
      .status(500)
      .send({
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
