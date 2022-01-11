const { error_400 } = require("../message")
const userQuery = require("../queries/userQuery")

module.exports = {
    checkRuleMiddle: async (req, res, next) => {
        const userid = req.user
        const user = await userQuery.getUserToId(userid)
        let flag = user.length > 0 ? true : false
        flag = user[0].rule != 1 ? false : true
        if (!flag) return error_400(res, "User does not have permission to use this function")
        next()
    },
}