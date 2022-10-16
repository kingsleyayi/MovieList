const Ranking = require('../models/Ranking')
const User = require('../models/User')
const axios = require("axios");


//list all movies
const index = async (req, res, next) => {
    let result
    let holdArray = []
    const options = {
        method: 'GET',
        url: 'https://list-movies.p.rapidapi.com/list_movies.json/false',
        headers: {
            'X-RapidAPI-Key': process.env.RAPID_API_KEY,
            'X-RapidAPI-Host': process.env.RAPID_API_HOST_NAME
        }
    };

    await axios.request(options).then(function (response) {
        result = response.data.data.movies
        for (const obj of result) {
            holdArray.push({
                title: obj.title,
                year: obj.year,
                rating: obj.rating,
                runtime: obj.runtime,
                genres: obj.genres,
                summary: obj.summary
            })
        }
    })
        .then(response => {
            console.log(result.length)
            res.json({
                holdArray
            })
        })
        .catch(function (error) {
            res.json({
                message: error
            })
        })
}

//add user movie and update rankings
const addMovie = (req, res, next) => {
    let userID = req.body.userID
    let ranking = req.body.rank
    Ranking.find({ "userID": userID })
        .then(async (response) => {
            for (const obj of response) {
                if (obj.rank >= ranking) {
                    let newrank = obj.rank + 1
                    if (newrank > 100) {
                        await Ranking.findByIdAndRemove(obj.id)
                    } else {
                        let updatedData = {
                            rank: newrank
                        }
                        await Ranking.findByIdAndUpdate(obj.id, { $set: updatedData })
                    }
                }
            }
        }).then(() => {
            let movieList = new Ranking({
                rank: ranking,
                moviename: req.body.moviename,
                userID: userID,
            })
            movieList.save()
        })
        .then(() => {
            res.json({
                message: "list updated"
            })
        })
        .catch(error => {
            res.json({
                message: 'An error Occured'
            })

        })

}

//get users movies
const userMovie = (req, res, next) => {
    let userID = req.body.userID
    Ranking.find({ "userID": userID }).sort({ rank: 'asc' })
        .then((response) => {
            res.json({
                response
            })
        }).catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })

}

//delete users movies
const deleteUserMovie = (req, res, next) => {
    let userID = req.body.userID
    let movieRank = req.body.movierank
    Ranking.find({ "userID": userID })
        .then(async (response) => {
            for (const obj of response) {
                if (obj.rank >= movieRank) {
                    let newrank = obj.rank - 1
                    if (movieRank == obj.rank) {
                        await Ranking.findByIdAndRemove(obj.id)
                    } else {
                        let updatedData = {
                            rank: newrank
                        }
                        await Ranking.findByIdAndUpdate(obj.id, { $set: updatedData })
                    }
                }
            }
        })
        .then((response) => {
            res.json({
                message: 'movie deleted'
            })
        }).catch(error => {
            res.json({
                message: 'An error Occured'
            })
        })

}




module.exports = {
    index,
    addMovie,
    userMovie,
    deleteUserMovie,

}