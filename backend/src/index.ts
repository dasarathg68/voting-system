import express from "express";
import cors from "cors";
import { getNonce } from "./controllers/userController";

const app = express();
app.use(cors());

app.get("/user/nonce/:address", getNonce);
