require ('dotenv').config()

const configs = {
    api: {
        port: process.env.PORT || 3000,
        host: process.env.HOST || 'http://localhost:3000',
        nodeEnv: process.env.NODE_ENV || 'development',
        secretOrKey: process.env.JWT_SECRET,
        firebase: {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
        }
    },
    db: {
        development: {
            //? configuraciones para conexion con sequelize
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'panetone007',
            database: 'academovies',
            define: {
                timestamps: true,
                underscored: true,
                underscoredAll:true
            }
        },
        production: {
            //? configuraciones para conexion con sequelize
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: process.env.DB_PORT ,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            define: {
                timestamps: true,
                underscored: true,
                underscoredAll:true
            },
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        },
        testing: {}
    }
}


module.exports = configs