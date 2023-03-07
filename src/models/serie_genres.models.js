const { DataTypes } = require("sequelize");

const db = require("../utils/database");

const Series = require('./series.models')
const Genres = require('./genres.models')

const SerieGenres = db.define('serie_genres', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    seriesId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Series,
            key: 'id'
        }
    },
    genreId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Genres,
            key: 'id'
        }
    }
})

module.exports = SerieGenres