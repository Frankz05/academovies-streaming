const router = require('express').Router()

const genreServices = require('./genres.services')

router.route('/')
    .get(genreServices.getAllGenres)
    .post(genreServices.postCreateGenre)


module.exports = router