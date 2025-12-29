import { ZodError } from "zod";

export default function schema(schemaLogic) {
  return function (req, res, next) {
    let result;
    if (!Array.isArray(req.body)) {
      result = schemaLogic.PostBodySchema.safeParse(req.body);
    } else {
      result = schemaLogic.MultipleBodySchema.safeParse(req.body);
    }

    if (!result.success) {
      return res.status(400).json(result.error.issues);
    }

    req.body = result.data;
    next();
  };
}
