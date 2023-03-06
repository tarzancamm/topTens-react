require('dotenv').config()
const {MovieList} = require('../util/models')

module.exports = {
    addTopTen: async (req, res) => {
        try {
            const {movieId} = req.body
            const {userId} = req.params

            const findUserMovies = await MovieList.findAll({where: {userId: userId}})
            if (findUserMovies.length >= 10) {
                await MovieList.destroy({where: {movieId: findUserMovies[9].movieId}})
                await MovieList.create({movieId, userId})
            } else {
                await MovieList.create({movieId, userId})
            }
            
            res.sendStatus(200)
        } catch(err) {
            console.log("Error adding to top ten")
            console.log(err)
            res.sendStatus(400)
        }
    },

    getTopTen: async (req, res) => {
        try {
            const {userId} = req.params
            const topTen = await MovieList.findAll({where: {userId: userId}})
            res.status(200).send(topTen)
        } catch (err) {
            console.log("Error retrieving top ten")
            console.log(err)
            res.sendStatus(400)
        }
    },

    deleteTopTen: async (req, res) => {
        try {
            const {userId} = req.params
            const {movieId} = req.body

            await MovieList.destroy({where: {movieId: movieId.toString(), userId: userId}}) //Issue with movieId being sent. Add explicit type casts(?)
            res.sendStatus(200)
        } catch (err) {
            console.log("Error deleting from top ten")
            console.log(err)
            res.sendStatus(400)
        }
    }
}