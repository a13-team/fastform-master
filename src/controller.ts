import express from "express";
import { FullResponse } from "request-promise-native";
import { StatusCodeError } from "request-promise-native/errors";
import { ValidationError } from "joi";
import { FORM_PATH } from "./config";
import { Crm } from "./crm";
import { createLogger } from "./logger";
import { validateLead } from "./schema";

const logger = createLogger("Lead");

export const controller = express.Router();

const formHandler: express.RequestHandler = async (req, res) => {
    //const ip = (req as any).realIp || req.ip;

    const finish = (res: express.Response, serverRes: FullResponse): void => {
        const { headers, statusCode, body } = serverRes;
        res.status(statusCode);

        for (const key in headers) {
            res.setHeader(key, headers[key]!);
        }

        res.end(body);
    };

    try {
        const data = validateLead(req.query);
        logger.info(`${data.lp} -> ${data.email}`);

        const crmRes = Crm.sendLead(data);
        await crmRes;

        if (!crmRes.response) throw new Error("No response");

        finish(res, crmRes.response);
    } catch (err: unknown | StatusCodeError | ValidationError) {
        if (err instanceof ValidationError) {
            res.status(400).json(err);
            return;
        }

        if (err instanceof StatusCodeError) {
            finish(res, err.response);
            return;
        }

        logger.error(err);

        res.status(500).json({ msg: "Internal error" });
    }
};

controller.get(FORM_PATH, formHandler);
controller.post(FORM_PATH, formHandler);

controller.get("/myip", (req, res) => res.end(req.headers["cf-ipcountry"]));
