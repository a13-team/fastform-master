import cors from "cors";
import express from "express";
import helmet from "helmet";
import { controller } from "./controller";
import { realIpMiddleware } from "./middlewares/ip.middleware";

export const app = express();
app.use(realIpMiddleware());
app.use(helmet());
app.use(cors());
//app.use(bodyParserMiddleware());

app.use(controller);
