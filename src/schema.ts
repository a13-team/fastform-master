import joi from "joi";

const stringMin1Max50 = joi.string().min(1).max(50).required();
const stringLength2 = joi.string().length(2).required();
const numberRequired = joi.number().required();

export const leadSchema = joi.object({
    f_name: stringMin1Max50,
    l_name: stringMin1Max50,
    email: stringMin1Max50,
    lp: stringMin1Max50,
    lp_url: stringMin1Max50,
    t_geo: stringLength2,
    lang: stringLength2,
    pixel_id: numberRequired,
    token: stringMin1Max50,
    phone2: numberRequired,
    params: stringMin1Max50.optional(),
});

export function validateLead(obj: any): LeadForm {
    const data = leadSchema.validate(obj, { stripUnknown: true });

    if (data.error) throw data.error;

    return data.value;
}
