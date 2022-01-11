const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
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
const e = require('cors');
const {
    convertCreated_at
} = require('../commons/functions/validateObj');
const {
    sendMail
} = require('../sockets/functions/verifyEmail');
const {
    checkBlock,
    getTokenUser,
    getProfileUser,
    removeItemArray,
    validationBody
} = require('../commons');
const userQuery = require('../queries/userQuery');
const {
    validateRegisterUser
} = require('../middlewares/validation');
const {
    validationResult
} = require('express-validator');
const menuQuery = require('../queries/menuQuery');
const {
    uploadAvatar,
    uploadVideo,
    uploadPhoto
} = require('../middlewares/muter');
const {
    addRowToTable
} = require('../queries/funcQuery');
const productQuery = require('../queries/productQuery');
const exerciseQuery = require('../queries/exerciseQuery');
const execise = require('../controller/execise');
const {
    uploadFileExecise
} = require('../controller/execise');
const { getUserManager } = require('../controller/user');
const opts = {
    errorEventName: 'error',
    logDirectory: `./src/log`,
    fileNamePattern: 'log.txt',
    dateFormat: 'YYYY.MM.DD'
};
const log = require('simple-node-logger').createRollingFileLogger(opts);

router.post('/signup', validateRegisterUser(), async function (req, res, next) {
    try {
        const {
            username,
            password,
            email
        } = req.body
        const errors = validationResult(req);
        if (!errors.isEmpty()) return error_400(res, "You have transmitted missing data!", errors)
        const user = await queries.getUserToUserName(username)
        if (user.length > 0) error_400(res, "Username already exists!", 1)
        else {
            const emailCheck = await userQuery.getUserToEmail(email)
            if (emailCheck.length > 0) error_400(res, "Email already exists!", 1)
            else {
                const arrayUser = JSON.stringify([]) ///// []
                var data = await userQuery.addUserEmail(username, email, password, arrayUser)
                const userEmail = await userQuery.getUserToId(data.resolve.insertId)
                let cusObj = userEmail[0]
                let token = getTokenUser(cusObj)
                try {
                    await sendMail(email, "Contract", username, password, token)
                } catch (error) {
                    console.log(error, "Email not send!")
                }
                success(res, "User need to register")
            }
        }
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/loginemail', async function (req, res, next) {
    try {
        const {
            email,
            password
        } = req.body
        const user = await userQuery.loginUser(email, password)
        if (user.length > 0) {
            if (user[0].active != 1) {
                let cusObj = user[0]
                let token = getTokenUser(cusObj)
                user[0].token = token
                success(res, "Login success", user[0])
            } else error_400(res, "Please verify your email", 1)
        } else error_400(res, "User is not exit!", 1)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/updatePassword', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            password,
            newPassword
        } = req.body
        const userid = req.user
        const user = await userQuery.getUserToPassword(password, userid)
        if (user.length <= 0) return error_400(res, "Incorrect password ", 1)
        await userQuery.updatePasswordToId(userid, newPassword)
        success(res, "Password update successful")
    } catch (error) {
        error_500(res, error)
    }
})
router.post('/getProfile', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {

        const idUser = req.user
        const user = await getProfileUser(idUser)
        if (!user) return error_400(res, "User is not define")
        success(res, "get user success", user)
    } catch (error) {
        error_500(res, error)
    }
})
router.post('/updateprofile', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            phone,
            address
        } = req.body
        const userid = req.user
        const flag = validationBody({
            phone,
            address
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)
        await userQuery.updateProfile(userid, address, phone)
        success(res, "Successfully updated")
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/likesubmenus', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            idSubMenu
        } = req.body
        const idUser = req.user
        const user = await getProfileUser(idUser)

        if (!user) return error_400(res, "User is not define")

        const subMenu = await menuQuery.getSubMenuToId(idSubMenu)
        if (subMenu.length <= 0) return error_400(res, "Submenu is not define", 2)

        const arrayToIdUser = JSON.parse(subMenu[0].userid_like)
        const evenMenu = (element) => element == idUser
        if (arrayToIdUser.some(evenMenu)) return error_400(res, `Did you enjoy this course?`, 1)


        const arrayIdSubMenu = JSON.parse(user.like_submenus)
        const even = (element) => element == idSubMenu
        if (arrayIdSubMenu.some(even)) return error_400(res, `Did you enjoy this course?`, 1)

        arrayToIdUser.push(idUser)
        arrayIdSubMenu.push(idSubMenu)
        await menuQuery.updateLikeSubMenuToId(idSubMenu, JSON.stringify(arrayIdSubMenu))
        await userQuery.updateLikeSubMenuToId(idUser, JSON.stringify(arrayToIdUser))
        success(res, "Successfully added to favorites ")
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/Unlikesubmenus', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            idSubMenu
        } = req.body
        const idUser = req.user
        const user = await getProfileUser(idUser)
        if (!user) return error_400(res, "User is not define")

        const subMenu = await menuQuery.getSubMenuToId(idSubMenu)
        if (subMenu.length <= 0) return error_400(res, "Submenu is not define", 2)

        const arrayToIdUser = JSON.parse(subMenu[0].userid_like)
        const evenMenu = (element) => element == idUser
        if (!arrayToIdUser.some(evenMenu)) return error_400(res, `You have not liked this course?`, 1)

        const arrayIdSubMenu = JSON.parse(user.like_submenus)
        const even = (element) => element == idSubMenu
        if (!arrayIdSubMenu.some(even)) return error_400(res, `You have not liked this course?`, 1)

        const arrayUserLike = removeItemArray(idUser, arrayToIdUser)
        const arraySubMenuLike = removeItemArray(idSubMenu, arrayIdSubMenu)
        await menuQuery.updateLikeSubMenuToId(idSubMenu, JSON.stringify(arrayUserLike))
        await userQuery.updateLikeSubMenuToId(idUser, JSON.stringify(arraySubMenuLike))
        success(res, "Successfully removed favorite list ")
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/getUserManager', getUserManager);
//// upload avatar
router.post('/updateAvatar', passport.authenticate('jwt', {
    session: false
}), uploadAvatar, async function (req, res, next) {
    try {
        const userid = req.user
        if (!req.file) return error_400(res, `Image files cannot be left blank, [avatar]`)

        var avatar = `images/${req.file.filename}`
        await userQuery.updateAvatar(userid, avatar)
        success(res, "Update avatar is successful!")

    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})

router.post('/uploadVideoExercise', passport.authenticate('jwt', {
    session: false
}), uploadVideo, async function (req, res, next) {
    req.body.message = `You haven't uploaded the video yet`
    req.body.folder = `videos`
    uploadFileExecise(req, res, next)
})
router.post('/uploadPhotoExercise', passport.authenticate('jwt', {
    session: false
}), uploadPhoto, async function (req, res, next) {
    try {
        req.body.folder = `images`
        req.body.message = `You haven't uploaded a picture yet`
        uploadFileExecise(req, res, next)
    } catch (error) {
        console.log(error);
    }
})
////////////////////////////////////// END ////////////////////////////////
router.post('/signup', async function (req, res, next) {
    try {
        const {
            username,
            nonce,
            address_wallet,
            signature
        } = req.body
        const user = await queries.getUserToUserNameAndAddwallet(username, address_wallet)
        if (user.length > 0) {
            error_400(res, "Username already exists!", 1)
        } else {
            const arrayUser = JSON.stringify([])
            await customerQuery.addUser(username, nonce, address_wallet, signature, arrayUser)
            const userLogin = await queries.getUserToUserNameAndAddwallet(username, address_wallet)
            let cusObj = userLogin[0]
            let token = jwt.sign({
                cusObj
            }, "app_steam", {
                expiresIn: 60 * 518400
            });
            userLogin[0].token = token
            res.json({
                message: "User need to register",
                status: false,
                data: userLogin[0]
            }).status(200)
        }
    } catch (error) {
        console.log(error);
        error_500(res, error)

    }
})
router.get('/getNews', async (req, res) => {
    try {
        success(res, "get news success", news)
    } catch (error) {
        error_500(res, error)
    }
})
router.post('/getprofileuser', async (req, res) => {
    try {
        const {
            userid
        } = req.body
        console.log(userid);
        const user = await customerQuery.getUserToId(userid)
        if (user.length > 0) {
            const posts = await customerQuery.getPostsToIdUserProfile(userid)
            const transaction = await customerQuery.getTransactionToId(userid)
            for await (package of transaction) {
                if (package.id_post == null) {
                    var data = await customerQuery.getPostsToId(package.id_library)
                    package.title = data[0].title
                } else if (package.id_library == null) {
                    var data = await customerQuery.getPostsToId(package.id_post)
                    package.title = data[0].title
                }
                let day = package.created_at.getDate();
                let month = package.created_at.getMonth() + 1;
                let year = package.created_at.getFullYear();
                var hours = package.created_at.getHours();
                var minutes = package.created_at.getMinutes();
                var seconds = package.created_at.getSeconds();
                package.created_at = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
            }
            const obj = {
                profile: {
                    created_at: user[0].created_at,
                    username: user[0].username,
                    avatar: user[0].avatar,
                    id: user[0].id,
                    email: user[0].email
                },
                transaction,
                posts
            }
            success(res, "get news success", obj)
        } else {
            error_400(res, "user is not exit", 1)
        }
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/updatepassword', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            password,
            passwordNew
        } = req.body
        const idUser = req.user
        success(res, "get success idUser", idUser)
    } catch (error) {

    }
})
router.get('/test', async function (req, res, next) {
    try {


        success(res, "Get General Success", {
            data: "ok"
        })
    } catch (error) {
        log.info(error)
        console.log(error);
        error_500(res, error)

    }
})
router.get('/getgeneral', async function (req, res, next) {
    try {
        const user = await customerQuery.getUserLength()
        const posts = await customerQuery.getPostLength()
        var data
        if (user.length > 0) {

            const lastUser = await customerQuery.getUserToId(user[user.length - 1].id)
            data = {
                user: user.length,
                posts: posts.length,
                lastUser: {
                    id: lastUser[0].id,
                    avatar: lastUser[0].avatar,
                    username: lastUser[0].username,
                    created_at: convertCreated_at(lastUser[0].created_at)
                }
            }
        } else {
            data = {
                user: user.length,
                posts: posts.length,
                lastUser: {
                    avatar: 0,
                    username: 0,
                    created_at: 0
                }
            }
        }



        success(res, "Get General Success", data)
    } catch (error) {
        log.info(error)
        console.log(error);
        error_500(res, error)

    }
})
router.post('/getnonce', async function (req, res, next) {
    try {
        const {
            address
        } = req.body
        const user = await queries.getWalletMetaMask(address)
        if (user.length > 0) {
            success(res, "Login success", user[0].nonce)
        } else {
            const id = crypto.randomBytes(6).toString("hex");
            res.json({
                message: "Get nonce success",
                status: false,
                data: id
            }).status(200)
        }
    } catch (error) {
        console.log(error);
        error_500(res, error)

    }
})


router.post('/login', async function (req, res, next) {
    try {
        const {
            address_wallet,
            signature
        } = req.body
        const user = await queries.loginMetaMask(address_wallet, signature)
        if (user.length > 0) {
            const block = await checkBlock(user[0].id)
            if (block) {
                let cusObj = user[0]
                let token = jwt.sign({
                    cusObj
                }, "app_steam", {
                    expiresIn: 60 * 518400
                });
                user[0].token = token
                success(res, "Login success!", user[0])
            } else {
                error_400(res, "This user has been locked!")
            }
        } else {
            error_400(res, "User is not exit!", 1)
        }
    } catch (error) {}
})
router.post('/active', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {


        const idUser = req.user
        console.log(idUser);
        const user = await queries.getUserToId(idUser)
        if (user.length > 0) {
            await customerQuery.updateActive(idUser)
            let cusObj = user[0]
            let token = jwt.sign({
                cusObj
            }, "app_steam", {
                expiresIn: 60 * 518400
            });
            user[0].token = token
            success(res, "Email verification successful", user[0])
        } else {
            console.log("aaaa");
        }
    } catch (error) {
        console.log(error)
        error_500(res, error)
    }
})
router.post('/connectWallet', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            address_wallet,
            nonce,
            signature
        } = req.body
        console.log("ok");
        const idUser = req.user
        const user = await queries.getUserToWallet(address_wallet)
        if (user.length > 0) {
            error_400(res, `User connected to ${address_wallet} wallet`, 1)
        } else {
            await customerQuery.connectWallet(idUser, address_wallet, signature, nonce)
            const flag = await queries.getUserToWallet(address_wallet)
            const userLogin = await queries.getUserToUserNameAndAddwallet(flag[0].username, address_wallet)
            let cusObj = userLogin[0]
            let token = jwt.sign({
                cusObj
            }, "app_steam", {
                expiresIn: 60 * 518400
            });
            userLogin[0].token = token
            res.json({
                message: "Connect to wallet to metamask successfully",
                status: false,
                data: userLogin[0]
            }).status(200)
        }
    } catch (error) {
        console.log(error)
        error_500(res, error)
    }
})




module.exports = router;