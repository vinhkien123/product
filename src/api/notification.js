const express = require('express');
const app = express();

var router = express.Router();
const otplib = require('otplib')
const jwt = require('jsonwebtoken')
const crypto = require("crypto");
const md5 = require('md5');

const passport = require('passport');
const passportConfig = require('../middlewares/passport')

const queries = require('../queries/customerQuery')
const {
    error_500,
    error_400,
    success
} = require('../message');
const customerQuery = require('../queries/customerQuery');
const {
    getListLimitPage
} = require('../commons/request');
const {
    validationBody
} = require('../commons');

router.post('/getNotificationToUser', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            limit,
            page,
        } = req.body
        const userid = req.user
        const flag = validationBody({
            limit,
            page,
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)

        const listVideo = await getListLimitPage(`tb_notification`, limit, page, `userid=${userid}`)
        success(res, "get list history success!", listVideo)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});

router.post('/addlibary', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            title,
            description,
            detail
        } = req.body
        const idUser = req.user
        console.log(idUser);
        if (idUser == 1) {
            const user = await customerQuery.getUserToId(idUser)
            if (user.length > 0) {
                await customerQuery.addPost(user[0].username, title, description, idUser, detail, user[0].userid)
                success(res, "More successful libary")
            } else {
                error_400(res, "User does not exist!", 1)
            }
        } else {
            error_400(res, "User does not have permission", 1)
        }
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;