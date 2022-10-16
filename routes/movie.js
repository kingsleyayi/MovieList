const express= require('express')
const router = express.Router()

const movieController = require('../controllers/movieController')
// const authenticate = require('../middleware/authenticate')

router.get('/', movieController.index)
router.post("/addmovie", movieController.addMovie)
router.post("/usermovie", movieController.userMovie)
router.post("/deleteusermovie", movieController.deleteUserMovie)

module.exports = router