import z from 'zod';

const movieSchema = z.object({
    title: z.string(),
    year: z.number().int().min(1888).max(new Date().getFullYear()),
    director: z.string(),
    duration: z.number(),
    poster: z.string().url(),
    genre: z.array(z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'])),
    rate: z.number().min(0).max(10)
});

export function validateMovie(object) {
    //console.log(movie);
    return movieSchema.safeParse(object);
}

export function validateMoviePatch(object) {
    return movieSchema.partial().safeParse(object);
}

