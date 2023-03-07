const {ExtractJwt, Strategy} = require('passport-jwt')
const passport = require('passport')

//*Importamos controlador que permite validar si usuario existe en la db
const {findUserById} = require('../users/users.controllers')
const config = require('../../config').api

//* Generamos cnfioguraciones basicas para manejar passport con jwt
const passportConfig = {
    //* Extrae el Bearer token de mi  peticion
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secretOrKey
}



//* done(error, respuesta)
passport.use(new Strategy(passportConfig, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
        .then( data => {
            if(data){
                done(null, tokenDecoded) //* El usuario existe y es valido
            } else {
                done(null, false, {message:'Token Incorrect'}) //* El usuario no existe
            }
        })
        .catch( err => {
            done(err, false) //* Error en la base de datos
        })
}))


module.exports = passport.authenticate('jwt', {session: false})