import express from "express";
import cors from "cors";
import { getNonce } from "./controllers/userController";

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());

app.get("/user/nonce/:address", getNonce);
app.listen(port, () => {
  console.log("Server is running on port", port);
});
