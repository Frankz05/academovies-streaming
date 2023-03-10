const firebase = require('firebase/app')
const { getStorage, uploadBytes, ref, getDownloadURL} = require('firebase/storage')

const config = require('../../config').api.firebase


const firebaseApp = firebase.initializeApp(config)

const storage = getStorage(firebaseApp)

//*Pelicula
const addToFirebaseMovieVideo = async (file) => {
    const movieRef = ref(storage, `movieVideos/${Date.now()}-${file.originalname}`)

    await uploadBytes(movieRef, file.buffer)
    const movieUrl = await getDownloadURL(movieRef)
    return movieUrl
}

//* Serie
const addToFirebaseSerieSeasonCover = async (file, name, season) => {
    const movieRef = ref(storage, `serie/${name}/${season}/${Date.now()}-${file.originalname}`)

    await uploadBytes(movieRef, file.buffer)
    const movieUrl = await getDownloadURL(movieRef)
    return movieUrl
}


module.exports = addToFirebaseMovieVideo