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

const MultipleBodySchema = z.array(
  z
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
    .strict()
);

const PatchBodySchema = z.object({
  title: z.string().min(1).optional(),
  plot: z.string().min(1).optional(),
  genres: z.array(z.string().min(1)).min(1).optional(),
  runtime: z.number().nonnegative().optional(),
  cast: z.array(z.string().min(1)).min(1).optional(),
  languages: z.array(z.string().min(1)).min(1).optional(),
  released: z.iso.datetime().optional(),
  directors: z.array(z.string().min(1)).min(1).optional(),
  rated: z.string().optional(),
  year: z.number().nonnegative().optional(),
  countries: z.array(z.string().min(1)).min(1).optional(),
  type: z.string().optional(),
  imdb: z
    .object({
      rating: z.number().nonnegative().max(10),
      votes: z.number().nonnegative(),
    })
    .optional(),
});

export { PostBodySchema, MultipleBodySchema, PatchBodySchema };
