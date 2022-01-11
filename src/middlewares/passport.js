const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const userQuery = require('../queries/userQuery')

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: "app_steam"
},async (payload, done) => {
    try {
        done(null, payload.cusObj.id)
    } catch (error) {
        console.log(error, "asd");
        done(error, false)
    }
}))