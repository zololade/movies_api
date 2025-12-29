import { ZodError } from "zod";

export default function schema(schemaLogic) {
  return function (req, res, next) {
    const result = schemaLogic.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json(result.error.issues);
    }

    req.body = result.data;
    next();
  };
}
