const movieControllers = require('./movies.controllers')
const responses = require('../utils/handleResponses')
const {addToFirebaseMovieVideo} = require('../utils/firebase')
const host = require('../../config').api.host


const getAllMovies = (req, res) => {
    //*Pagination
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 10
    //*Search
    const search = req.query.search

    movieControllers.findAllMovies(limit, offset, search)
        .then( data => {
            const nextPageUrl = data.count -offset > limit? `${host}/api/v1/movies?offset=${offset+limit}&limit=${limit}` : null
            const prevPageUrl = (offset - limit) >= 0? `${host}/api/v1/movies?offset=${offset-limit}&limit=${limit}` : null

            responses.success({
                res,
                status: 200,
                count: data.count,
                next: nextPageUrl,
                prev: prevPageUrl,
                data: data.rows,
                message: 'Getting all the movies'
            })
        })
        .catch( err => {
            responses.error({
                res,
                status: 400,
                data: err,
                message: 'Something bad getting the movies'
            })
        })
}

const postMovies = async(req, res) => {
    const movieObj = req.body
    const movieFile = req.files

    try {
        const movieUrl = await addToFirebaseMovieVideo(movieFile)
        const data = await movieControllers.createMovie(...movieObj, movieUrl)
        responses.success({
            res,
            status: 201,
            data,
            message: 'Movie created'
        })
    } catch (err) {
        responses.error({
            res,
            data: err,
            message: err.message,
            status: 400,
            fields: {
                title: 'string',
                synopsis: 'string',
                releaseYear: 2020,
                director: 'string',
                duration: 180,
                trillerUrl: 'a',
                coverUrl: 'a',
                classification: 'string',
                rating: 0.0
            }
        })
    }
}

const postGenreToMovie = (req, res) =>{
    const {movieId, genreId} = req.params

    movieControllers.addGenreToMovie({movieId, genreId})
        .then( data =>{
            responses.success({
                res,
                status:201,
                message: 'Genre added to movie successfully',
                data
            })
        })
        .catch( err =>{
            responses.error({
                res,
                status:400,
                message: err.message,
                data: err
            })
        })
}

const getAllMoviesByGenre = (req, res) => {
    const genreId = req.params.genreId
    movieControllers.findAllMoviesByGenre(genreId)
        .then( data => {
            responses.success({
                res,
                status: 200,
                data,
                message: 'Getting all the movies'
            })
        })
        .catch( err => {
            responses.error({
                res,
                status: 400,
                data: err,
                message: 'Something bad getting the movies'
            })
        })
}

module.exports = {
    getAllMovies,
    postMovies,
    postGenreToMovie,
    getAllMoviesByGenre
}