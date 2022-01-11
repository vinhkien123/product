const { validationBody } = require("../commons")
const { getListLimitPage } = require("../commons/request")
const { error_400 } = require("../message")

module.exports = {
    getListLimitPageController: async function (req, res, next) {

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
    }
}