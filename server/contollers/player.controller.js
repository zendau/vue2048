const PlayerService = require("../services/player.service")

class PlayerController {
    async addPlayer(req, res, next) {
        try {
            const {username, score} = req.body

            await PlayerService.addPlayer(username, score)

            res.json("OK")

        } catch (e) {
            next(e)
        }
    }


    async getListOfPlayers(req, res, next) {
        try {
            const data = await PlayerService.getAllUsers()
            res.json(data)

        } catch (e) {
            next(e)
        }
    }
}

module.exports = new PlayerController()