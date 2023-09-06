import express from "express";
import path from "path";
import { pineconeCrudRouter } from "./routes/pineconeCrudRoutes.mjs";
import { PORT } from "./config/index.mjs";
import type { Express } from "express";

const __dirname = path.resolve();
const app: Express = express();

app.use(express.json());
app.use("/api/v1", pineconeCrudRouter);
app.use(express.static(path.join(__dirname, "public/build")));

app.get("/testing", (req, res) => res.send("server testing ok"));

app.listen(PORT, () => console.log(`app listening on ===>>> ${PORT}`));
