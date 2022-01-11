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
const productQuery = require('../queries/productQuery');
const {
    getProfileUser,
    validationBody,
    convertArrayCreated_at
} = require('../commons');
const {
    getProfileUserToIdArray
} = require('../commons/functions/user');
const funcQuery = require('../queries/funcQuery');
const {
    addNotificationToIdUser
} = require('../commons/functions/notification');
const {
    getListLimitPage
} = require('../commons/request');
//////////////////////////////////////////////////////////// USER /////////////////////////////////
router.post('/getProductToIdSubMenu', async function (req, res, next) {

    try {
        const {
            limit,
            page,
            idSubMenu
        } = req.body
        const package = await productQuery.getProductsToIdSubMenu(limit, page, idSubMenu)
        for await (item of package) {
            const arrayIdManager = JSON.parse(item.manager)
            const data = await getProfileUserToIdArray(arrayIdManager)
            item.profileManager = data
        }
        const allPackage = await productQuery.getProductsToIdSubMenuLength(idSubMenu)
        const obj = {
            array: package,
            total: allPackage.length,
        }
        success(res, "getpostsToIdSubMenu success!", obj)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.get('/getAllProducts', async function (req, res, next) {

    try {
        const {
            limit,
            page
        } = req.body
        const flag = validationBody({
            limit,
            page
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)
        const package = await getListLimitPage(`tb_product`, limit, page)
        success(res, "getpostsToIdSubMenu success!", package)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/getStepProducts', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {

    try {
        const userid = req.user
        const {
            idProduct
        } = req.body
        const flag = validationBody({
            idProduct,
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)
        const package = await productQuery.getStepProduct(userid, idProduct)
        success(res, "getpostsToIdSubMenu success!", package[0])
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/getProductsToStep', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {

    try {
        const userid = req.user
        const {
            step,
            limit,page
        } = req.body
        const flag = validationBody({
            step,
            limit,page
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)

        const package = await getListLimitPage(`tb_processing_products`,limit,page,`userid=${userid} AND step=${step}`)
        success(res, "getpostsToIdSubMenu success!", package)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/updateStepProduct', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {

    try {
        const userid = req.user
        const {
            idProduct,
            step
        } = req.body
        const flag = validationBody({
            idProduct,
            step
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)
        await productQuery.updateStepToProducts(userid, step, idProduct)
        success(res, "update success!")
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/getProfileManagerToIdProduct', async function (req, res, next) {

    try {
        const {
            idProduct
        } = req.body
        const product = await productQuery.getProductsToId(idProduct)
        if (product.length <= 0) return error_400(res, "Id Product is not define!", 1)

        const arrayIdManager = JSON.parse(product[0].manager)
        const data = await getProfileUserToIdArray(arrayIdManager)
        success(res, "getProfileManagerToIdProduct success!", data)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/buyproduct', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            id_product,
        } = req.body
        const userid = req.user
        const flag = validationBody({
            id_product,
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)

        const product = await productQuery.getBuyProductsToIdAndProduct(userid, id_product)
        if (product.length > 0) return error_400(res, `This course is already registered`, 1)

        const productItem = await productQuery.getProductsToId(id_product)
        if (productItem.length <= 0) return error_400(res, `Product is not define`, 2)

        await productQuery.addBuyProduct(userid, productItem[0].title, id_product)
        await addNotificationToIdUser(userid, `Course`, `You have successfully purchased the ${productItem[0].title} course`)
        await funcQuery.addRowToTable(`tb_processing_products`, {
            idProduct: id_product,
            userid
        })
        success(res, "Successfully registered for the course")
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/historybuyproduct', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            limit,
            page,
        } = req.body
        const idUser = req.user
        const flag = validationBody({
            limit,
            page,
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)

        const package = await productQuery.getHistoryBuyProductToId(limit, page, idUser)
        const allPackage = await productQuery.getHistoryBuyProductToIdPagination(idUser)
        if (package.length > 0) {
            convertArrayCreated_at(package)
        }
        const obj = {
            array: package,
            total: allPackage.length
        }
        success(res, "get list history Active user success!", obj)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
//////////////////////////////////////////////////////////// USER END /////////////////////////////////

//////////////////////////////////////////////////////////// END /////////////////////////////////
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