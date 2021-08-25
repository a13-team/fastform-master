import Request from "request-promise-native";
import { CRM_URL } from "./config";

const request = Request.defaults({ baseUrl: CRM_URL/* , followAllRedirects: true */ });

export class Crm {
    static sendLead(lead: LeadForm) {
        const req = request.get({ uri: "api/ajax", method: "GET", qs: lead });

        return req;
    }
}
