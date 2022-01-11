const { validationBody } = require("../commons")
const { error_400, success } = require("../message")
const exerciseQuery = require("../queries/exerciseQuery")
const { addRowToTable } = require("../queries/funcQuery")
const productQuery = require("../queries/productQuery")
const userQuery = require("../queries/userQuery")

module.exports = {
    uploadFileExecise: async (req, res) => {
         try {
             const userid = req.user
             const {
                 title,
                 idProduct,
                 message,
                 folder
             } = req.body
             const flag = validationBody({
                 title,
             })
             if (flag.length > 0) return error_400(res, 'Not be empty', flag)

             if (!req.file) return error_400(res, message)

             const exercise = await exerciseQuery.getExerciseToUserIdAndProduct(userid, idProduct)
             if (exercise.length > 0) return error_400(res, `You have submitted your assignment`)

             const userAsync = userQuery.getUserToId(userid)
             const productAsync = productQuery.getProductsToId(idProduct)
             const [user, product] = await Promise.all([userAsync, productAsync])
             const files = `${folder}/${req.file.filename}`
             const obj = {
                 files,
                 title,
                 userid,
                 username: user[0].username,
                 idProduct,
                 titleProduct: product[0].title
             }
             await addRowToTable(`tb_exercise`, obj)
             success(res, "Submit assignment successfully!")

         } catch (error) {
             console.log(error);
             error_500(res, error)
         }
    }
}