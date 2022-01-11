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
const menuQuery = require('../queries/menuQuery');
const { getSubMenuToIdArray } = require('../commons/functions/menu');
const { getProfileUser } = require('../commons');
///////////////////////// USER ////////////////////////////
router.get('/getslider', async function (req, res, next) {
    try {
        const data = await menuQuery.getSlider()
        success(res, "Get Slider success", data)
    } catch (error) {
        console.log(error);
    }
})
router.get('/getmenu', async function (req, res, next) {
    try {
        const data = await menuQuery.getMenu()
        success(res,"Get menu success",data)
    } catch (error) {console.log(error);}
})
router.post('/getsubmenu', async function (req, res, next) {
    try {
        const {idMenu} = req.body
        const data = await menuQuery.getSubMenuToIdMenu(idMenu)
        success(res, "Get menu success", data)
    } catch (error) {
        console.log(error);
    }
})
router.post('/getListLikeSubMenu', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {

        const idUser = req.user
        const user = await getProfileUser(idUser)
        if (!user) return error_400(res, "User is not define")

        const arrayListLikeSubMenu = JSON.parse(user.like_submenus)
        const data = await getSubMenuToIdArray(arrayListLikeSubMenu)
        success(res, "get user success", data)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
////////////////////////// END USER ///////////////////////////
////////////////////////// END ////////////////////////////////
router.post('/getmaenu', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            title,
            description,
            detail
        } = req.body
        const idUser = req.user
        if (idUser == 1) {
            const user = await customerQuery.getUserToId(idUser)
            if (user.length > 0) {
                await customerQuery.addPost(user[0].username, title, description, idUser, detail, user[0].userid)
                success(res, "More successful libary")
            } else {
                error_400(res, "User does not exist!", 1)
            }
        }else{
            error_400(res,"User does not have permission",1)
        }
    } catch (error) {
        console.log(error);
    }
})




module.exports = router;