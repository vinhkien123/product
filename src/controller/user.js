const {
    validationBody
} = require("../commons")
const {
    getListLimitPage
} = require("../commons/request")
const {
    error_400,
    error_500,
    success
} = require("../message")

module.exports = {
    getUserManager: async function (req, res, next) {

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
            const package = await getListLimitPage(`tb_user`, limit, page, `rule = 1`)
            success(res, "getUserManager success!", package)
        } catch (error) {
            console.log(error);
            error_500(res, error)
        }
    }
}