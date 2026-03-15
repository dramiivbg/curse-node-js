const zod = require('zod');

const movieSchema = zod.object({
    title: zod.string(),
    year: zod.number().int().min(1888).max(new Date().getFullYear()),
    director: zod.string(),
    duration: zod.number(),
    poster: zod.string().url(),
    genre: zod.array(zod.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'])),
    rate: zod.number().min(0).max(10)
});

function validateMovie(object) {
    //console.log(movie);
    return movieSchema.safeParse(object);
}

function validateMoviePatch(object) {
    return movieSchema.partial().safeParse(object);
}

module.exports = {
    validateMovie,
    validateMoviePatch
};