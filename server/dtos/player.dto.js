module.exports = class PlayerDto {
    id
    username
    score

    constructor(model) {
        this.id = model._id;
        this.username = model.username;
        this.score = model.score;
    }
}