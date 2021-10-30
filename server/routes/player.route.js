const Router = require('express').Router
const PlayerController = require('../contollers/player.controller')
const router = new Router()

router.post("/addPlayer", PlayerController.addPlayer)
router.get("/getList", PlayerController.getListOfPlayers)

module.exports = router