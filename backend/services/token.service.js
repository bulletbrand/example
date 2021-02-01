const Token = require('../models/UserToken')
const randToken = require('rand-token');
const ACCESS_TOKEN_CONST = {TTL: 1000 * 60 * 60 * 12, SIZE: 200};

const create = async (userName) => {
    const token = randToken.uid(ACCESS_TOKEN_CONST.SIZE);
    await Token.create({
        id: token,
        userName: userName,
        isVerified: true,
        validDate: new Date(new Date().getTime() + ACCESS_TOKEN_CONST.TTL),
    })
    return token;
}

const findUser = async (value) => {
    const token = await Token.findOne({where: {id: value}});
    if (!token) {
        throw {
            message: `The User To hasn\'t been found`
        }
    } else {
        return token.dataValues
    }
}


module.exports = {create, findUser}
