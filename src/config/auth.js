const { jwtSecret } = require('../../.env');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const User = require('../models/User');
const { ExtractJwt , Strategy} = passportJwt;

module.exports = function() {
    try {
        const params = {}
        params.secretOrKey = jwtSecret,
        params.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
        const strategy = new Strategy(params, ( payload, done )=>{
                User.findByPk(payload.id)
                .then((user)=>{
                    console.log(user)
                    return done(null, user ? {...payload} : false)})
                    .catch((error)=>{
                        return done(new Error('Usuário não encontrado'), false)
                    })
        })
        passport.use(strategy);
        return {
            initialize: function() {
            return passport.initialize();
            },
            authenticate: function() {
            return passport.authenticate("jwt", {session : false });
            }
        };
    } catch (error) {
       return false;
    } 
}