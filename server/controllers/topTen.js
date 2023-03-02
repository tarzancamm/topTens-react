require('dotenv').config()
const {Movie, MovieList} = require('../util/models')

module.exports = {
    addTopTen: async (req, res) => {
        try {
            const {movieId} = req.body
            const {userId} = req.params

            await MovieList.create({movieId, userId})
            
            res.sendStatus(200)
        } catch(err) {
            console.log("Error adding to top ten")
            console.log(err)
            res.sendStatus(400)
        }
    }
}