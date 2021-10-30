const playersModel = require("../models/player")
const PlayerDto = require("../dtos/player.dto");

class PlayerService {

    async addPlayer(username, score) {
       await playersModel.create({
            username,
            score,
        })
    }

    async getAllUsers() {

        const players = await playersModel.find()
        const playerDto = players.map(player => new PlayerDto(player))

        return playerDto;
    }

}

module.exports = new PlayerService()