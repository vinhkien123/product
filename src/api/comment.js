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
const {
    checkBlock,
    checkCommentPost,
    validationBody,
    getAvatarItemToArray,
    resListLimitPage,
} = require('../commons');
const userQuery = require('../queries/userQuery');
const commentQuery = require('../queries/commentQuery');
const {
    checkRuleMiddle
} = require('../middlewares/check');
const { addNotificationToIdUser } = require('../commons/functions/notification');

////////////////////////////////////USER ////////////////////////////////
router.post('/addcomments', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            idProduct,
            description
        } = req.body
        const idUser = req.user
        const flag = validationBody({
            idProduct,
            description
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)
        const user = await userQuery.getUserToId(idUser)
        await commentQuery.addComments(user[0].username, idUser, description, idProduct)
        await commentQuery.updateReply(idProduct)
        success(res, "Successful comment")
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/addParentComment', passport.authenticate('jwt', {
    session: false
}), checkRuleMiddle, async function (req, res, next) {
    try {
        const {
            idProduct,
            description,
            idComment
        } = req.body
        const idUser = req.user
        const flag = validationBody({
            idProduct,
            description,
            idComment
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)

        const user = await userQuery.getUserToId(idUser)
        const comment = await commentQuery.getCommentToId(idComment)
        if (comment.length <= 0) return error_400(res, 'idComment is not define', 1)

        var data = await commentQuery.addPrentComments(user[0].username, idUser, description, idProduct, idComment)
        var commentParse = JSON.parse(comment[0].sub_comment)
        commentParse.push(data.resolve.insertId)
        var string = JSON.stringify(commentParse)
        await commentQuery.updateSubComment(idComment, string)
        await commentQuery.updateReplyComment(idComment)
        await addNotificationToIdUser(comment[0].userid, `Comment`, `${user[0].username} replied to your comment`)
        success(res, "Successful comment")
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/getcomments', async function (req, res, next) {
    try {
        const {
            limit,
            page,
            id_product
        } = req.body
        const flag = validationBody({
            limit,
            page,
            id_product
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)

        const package = await commentQuery.getComments(limit, page, id_product)
        const allPackage = await commentQuery.getCommentsProductPagination(id_product)
        const arrayConvert = await getAvatarItemToArray(package)
        const obj = resListLimitPage(arrayConvert, allPackage.length)
        success(res, "get list swap success!", obj)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/getparentcomment', async function (req, res, next) {

    try {
        const {
            id_comment
        } = req.body
        const flag = validationBody({
            id_comment
        })
        if (flag.length > 0) return error_400(res, 'Not be empty', flag)

        var array = []
        const allPackage = await commentQuery.getCommentToIdCommentPagination(id_comment)
        if (allPackage.length <= 0) return error_400(res, "id comment id not define", 1)

        const arrayReplyComment = JSON.parse(allPackage[0].sub_comment)
        for await (subComment of arrayReplyComment) {
            const comment = await commentQuery.getCommentToIdCommentPagination(subComment)
            const user = await userQuery.getUserToId(comment[0].userid)
            comment[0].avatar = user[0].avatar
            array.push(comment[0])
        }

        success(res, "getparentcomment success!", array)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/voteComment', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            idComment
        } = req.body
        const flagg = validationBody({
            idComment
        })
        if (flagg.length > 0) return error_400(res, 'Not be empty', flagg)

        const idUser = req.user
        const comment = await commentQuery.getCommentToId(idComment)
        var arrayIdVote = JSON.parse(comment[0].id_vote)
        var commentPars = JSON.parse(comment[0].sub_comment)
        var flag = true
        for (element of arrayIdVote) {
            if (element == idUser) flag = false
        }
        if (!flag) return error_400(res, "You like for this comment", 1)

        arrayIdVote.push(idUser)
        var arrayVote = JSON.stringify(arrayIdVote)
        await commentQuery.updateVote(idComment, arrayVote)
        const lastComment = await commentQuery.getCommentToId(idComment)
        success(res, "Vote success", lastComment[0])
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
///////////////////////////////////////////////// END /////////////////////////////
router.post('/votepost', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            id_post,
            hash,
            amount,
            chain,
            contract
        } = req.body
        const idUser = req.user
        if (idUser) {
            const block = await checkBlock(idUser)
            if (block) {
                const comment = await customerQuery.getPostsToId(id_post)
                var arrayIdVote = JSON.parse(comment[0].id_vote)
                ////////////////START //////////////
                arrayIdVote.push(idUser)
                var arrayVote = JSON.stringify(arrayIdVote)
                const user = await customerQuery.getUserToId(idUser)
                await customerQuery.updateVotePost(id_post, arrayVote)
                await customerQuery.addVoteTransactionPost(user[0].username, idUser, hash, id_post, amount, contract, chain)
                const commenttest = await customerQuery.getPostsToId(id_post)
                success(res, "Vote success", commenttest[0])
            } else {
                error_400(res, "Your account has been locked", 2)
            }
        }
    } catch (error) {
        console.log(error);
    }
})
router.post('/votelibrary', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            id_library,
            hash,
            amount,
            chain,
            contract
        } = req.body
        const idUser = req.user
        if (idUser) {
            const block = await checkBlock(idUser)
            if (block) {
                const comment = await customerQuery.getLibraryToId(id_library)
                var arrayIdVote = JSON.parse(comment[0].id_vote)
                var flag = true
                for (element of arrayIdVote) {
                    if (element == idUser) {
                        flag = false
                    }
                }
                if (flag) {
                    arrayIdVote.push(idUser)
                    var arrayVote = JSON.stringify(arrayIdVote)
                    const user = await customerQuery.getUserToId(idUser)
                    await customerQuery.updateVoteLibrary(id_library, arrayVote)
                    await customerQuery.addVoteTransactionLibrary(user[0].username, idUser, hash, id_library, amount, contract, chain)
                    const comment = await customerQuery.getLibraryToId(id_library)
                    success(res, "Vote success", comment[0])
                } else {
                    error_400(res, "You voted for this post", 1)
                }
            } else {
                error_400(res, "Your account has been locked", 2)
            }


        }
    } catch (error) {
        console.log(error);
    }
})


router.post('/addcommentsLibrary', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            id_library,
            description
        } = req.body
        const idUser = req.user
        if (idUser) {
            const block = await checkBlock(idUser)
            if (block) {
                if (description) {
                    // const getPost = await customerQuery.getPostsToId(idPost)
                    // if(getPost[0].userid != idUser){

                    // }else{

                    // }
                    const user = await customerQuery.getUserToId(idUser)
                    if (user.length > 0) {
                        var array = JSON.stringify([])
                        await customerQuery.addCommentsLibrary(user[0].username, idUser, description, id_library, array)
                        await customerQuery.updateReplyLibrary(id_library)
                        success(res, "Successful comment")
                    } else {
                        error_400(res, "User does not exist!", 1)
                    }
                } else {
                    error_400(res, "Not be empty!", 1)
                }
            } else {
                error_400(res, "Your account has been locked", 2)
            }
        }
    } catch (error) {
        console.log(error);
    }
})
router.post('/getdetailcomment', async function (req, res, next) {
    try {
        const {
            id,
        } = req.body
        const getPostId = await customerQuery.getCommentToId(id)

        if (getPostId.length > 0) {
            const user = await customerQuery.getUserToId(getPostId[0].userid)
            getPostId[0].avatar = user[0].avatar
            success(res, "get comment success!", getPostId[0])
        } else {
            error_400(res, "Error post", 1)
        }

    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/getcomments', async function (req, res, next) {

    try {

        const {
            limit,
            page,
            id_post
        } = req.body
        const package = await customerQuery.getComments(limit, page, id_post)
        const allPackage = await customerQuery.getCommentsPost(id_post)
        if (package.length > 0) {
            for await (pack of package) {

                const user = await customerQuery.getUserToId(pack.userid)
                pack.avatar = user[0].avatar
            }
        }

        const obj = {
            array: package,
            total: allPackage.length
        }
        success(res, "get list swap success!", obj)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/voteComment', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            idComment
        } = req.body
        const idUser = req.user
        if (idUser) {
            const block = await checkBlock(idUser)
            if (block) {
                const comment = await customerQuery.getCommentToId(idComment)
                var arrayIdVote = JSON.parse(comment[0].id_vote)
                var commentPars = JSON.parse(comment[0].sub_comment)
                var flag = true
                for (element of arrayIdVote) {
                    if (element == idUser) {
                        flag = false
                    }
                }
                if (flag) {
                    arrayIdVote.push(idUser)
                    var arrayVote = JSON.stringify(arrayIdVote)
                    await customerQuery.updateVote(idComment, arrayVote)
                    const comment = await customerQuery.getCommentToId(idComment)
                    success(res, "Vote success", comment[0])
                } else {
                    error_400(res, "You voted for this post", 1)
                }
            } else {
                error_400(res, "Your account has been locked", 2)
            }


        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/getparentcomment', async function (req, res, next) {

    try {

        const {
            limit,
            page,
            id_comment
        } = req.body
        var array = []
        const allPackage = await customerQuery.getCommentToIdCommentPagination(id_comment)
        if (allPackage.length > 0) {
            const arrayReplyComment = JSON.parse(allPackage[0].sub_comment)
            for await (subComment of arrayReplyComment) {
                const comment = await customerQuery.getCommentToIdCommentPagination(subComment)
                const user = await customerQuery.getUserToId(comment[0].userid)
                comment[0].avatar = user[0].avatar
                array.push(comment[0])
            }

        } else {

        }


        success(res, "get list swap success!", array)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
router.post('/addParentComment', passport.authenticate('jwt', {
    session: false
}), async function (req, res, next) {
    try {
        const {
            idPost,
            description,
            idComment
        } = req.body
        const idUser = req.user
        if (idUser) {
            const block = await checkBlock(idUser)
            if (block) {
                if (description) {
                    // const getPost = await customerQuery.getPostsToId(idPost)
                    // if(getPost[0].userid != idUser){

                    // }else{

                    // }
                    const user = await customerQuery.getUserToId(idUser)
                    if (user.length > 0) {
                        const comment = await customerQuery.getCommentToId(idComment)
                        var array = JSON.stringify([])
                        var data = await customerQuery.addPrentComments(user[0].username, idUser, description, idPost, array, idComment, array)
                        var commentParse = JSON.parse(comment[0].sub_comment)
                        commentParse.push(data.resolve.insertId)
                        var string = JSON.stringify(commentParse)
                        await customerQuery.updateSubComment(idComment, string)

                        await customerQuery.updateReplyComment(idComment)
                        success(res, "Successful comment")
                    } else {
                        error_400(res, "User does not exist!", 1)
                    }
                } else {
                    error_400(res, "Not be empty!", 1)
                }
            } else {
                error_400(res, "Your account has been locked", 2)
            }
        }
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
})
router.post('/getSubComments', async function (req, res, next) {

    try {

        const {
            limit,
            page,
            id_comment
        } = req.body
        const package = await customerQuery.getSubComments(limit, page, id_comment)
        const allPackage = await customerQuery.getSubCommentsPagination(id_comment)
        if (package.length > 0) {
            for await (pack of package) {

                const user = await customerQuery.getUserToId(pack.userid)
                pack.avatar = user[0].avatar
            }
        }

        const obj = {
            array: package,
            total: allPackage.length
        }
        success(res, "get list swap success!", obj)
    } catch (error) {
        console.log(error);
        error_500(res, error)
    }
});
module.exports = router;