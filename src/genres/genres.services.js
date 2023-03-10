const genresControllers = require('./genres.controllers')
const responses = require('../utils/handleResponses')
const e = require('express')

const getAllGenres = (req, res) => {
    genresControllers.findAllGenres()
    .then( data =>{
        responses.success({
            res,
            status:200,
            message: 'Getting all Genres',
            data: data
        })

    })
    .catch( err =>{
        responses.error({
            res,
            status:400,
            data: err,
            message: err.message
        })
    })
}

const postCreateGenre = (req, res) => {
    const {name} = req.body
    genresControllers.createGenre(name)
    .then( data =>{
        responses.success({
            res,
            status:201,
            message: 'Genre created successfully',
            data: data
        })
    })
    .catch( err =>{
        responses.error({
            res,
            status:400,
            data: err,
            message: err.message,
            fields: {
                name: 'string'
            }
        })
    })
}


module.exports = {
    getAllGenres,
    postCreateGenre
}