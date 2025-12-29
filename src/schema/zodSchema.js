import { z } from "zod";

const PostBodySchema = z
  .object({
    title: z.string().min(1),
    plot: z.string().min(1),
    genres: z.array(z.string().min(1)).min(1),
    runtime: z.number().nonnegative(),
    cast: z.array(z.string().min(1)).min(1),
    languages: z.array(z.string().min(1)).min(1),
    released: z.iso.datetime(),
    directors: z.array(z.string().min(1)).min(1),
    rated: z.string(),
    year: z.number().nonnegative(),
    countries: z.array(z.string().min(1)).min(1),
    type: z.string(),
    imdb: z.object({
      rating: z.number().nonnegative().max(10),
      votes: z.number().nonnegative(),
    }),
  })
  .strict();

export { PostBodySchema };
