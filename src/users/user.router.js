const router = require('express').Router()

const userServices = require('./users.services')
const passportJWT = require('../middlewares/auth.middleware')

router.get('/', userServices.getAllUsers)
router.post('/', userServices.postNewUser)


router.get('/me', passportJWT, userServices.getMyUser )
router.delete('/me', passportJWT, userServices.deleteMyUser )
router.patch('/me', passportJWT,userServices.patchMyUser)

router.get('/:id', userServices.getUserById)
router.patch('/:id', userServices.patchUser)
router.delete('/:id', userServices.deleteUser)

module.exports = router